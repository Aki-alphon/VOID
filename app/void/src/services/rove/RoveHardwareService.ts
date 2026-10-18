/**
 * PROJECT VOID OS // ROVE HARDWARE SERVICE
 * Interfaces with Seeed Studio XIAO ESP32-S3 Sense hardware companion node.
 * 
 * Capabilities:
 * - WebSocket telemetry link (ws://<board_ip>:<port>/)
 * - Heartbeat & round-trip latency (RTT) tracking
 * - Log-distance path loss WiFi RSSI localization: d = 10^((-42 - RSSI) / 24)
 * - Remote camera snapshot acquisition (HTTP JPEG / buffer)
 * - Binary 16kHz PCM audio stream reception from onboard PDM microphone (GPIO 41/42)
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

export interface RoveTelemetry {
  boardIp: string;
  wsPort: string;
  isConnected: boolean;
  rttMs: number;
  rssi: number;
  estimatedDistanceMeters: number;
  motionIndex: number;
  freeHeapBytes?: number;
  freePsramBytes?: number;
  fps?: number;
  lastSeenTimestamp: number;
}

export type RoveTelemetryListener = (telemetry: RoveTelemetry) => void;
export type RoveAudioListener = (audioEnergy: number) => void;

const STORAGE_KEY_IP = 'void_board_ip';
const STORAGE_KEY_PORT = 'void_ws_port';
const DEFAULT_IP = '192.168.0.106';
const DEFAULT_PORT = '81';

// Log-Distance Path Loss Model constants for indoor 2.4GHz WiFi
const REFERENCE_RSSI_1M = -42; // Signal at 1 meter in dBm
const PATH_LOSS_EXPONENT = 2.4; // Indoor environment attenuation factor

export class RoveHardwareService {
  private static instance: RoveHardwareService;

  private boardIp: string = DEFAULT_IP;
  private wsPort: string = DEFAULT_PORT;
  private ws: WebSocket | null = null;
  private isConnected: boolean = false;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private pingInterval: NodeJS.Timeout | null = null;
  private lastPingTime: number = 0;
  private rttMs: number = 0;

  // Telemetry state
  private rssi: number = -52;
  private smoothedRssi: number = -52;
  private estimatedDistance: number = 1.0;
  private motionIndex: number = 0;
  private lastSeen: number = 0;

  // Audio state
  private isRecordingAudio: boolean = false;
  private audioEnergy: number = 0;

  private telemetryListeners: Set<RoveTelemetryListener> = new Set();
  private audioListeners: Set<RoveAudioListener> = new Set();

  private constructor() {
    this.loadSavedConfig();
  }

  public static getInstance(): RoveHardwareService {
    if (!RoveHardwareService.instance) {
      RoveHardwareService.instance = new RoveHardwareService();
    }
    return RoveHardwareService.instance;
  }

  public async loadSavedConfig(): Promise<{ip: string; port: string}> {
    try {
      const [savedIp, savedPort] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEY_IP),
        AsyncStorage.getItem(STORAGE_KEY_PORT),
      ]);
      if (savedIp) this.boardIp = savedIp;
      if (savedPort) this.wsPort = savedPort;
    } catch {
      // Fall back to defaults
    }
    return {ip: this.boardIp, port: this.wsPort};
  }

  public async setBoardConfig(ip: string, port: string = '81'): Promise<void> {
    this.boardIp = ip.trim();
    this.wsPort = port.trim();
    await Promise.all([
      AsyncStorage.setItem(STORAGE_KEY_IP, this.boardIp),
      AsyncStorage.setItem(STORAGE_KEY_PORT, this.wsPort),
    ]);
    if (this.isConnected) {
      this.disconnect();
      this.connect();
    }
  }

  public getBoardIp(): string {
    return this.boardIp;
  }

  public getWsPort(): string {
    return this.wsPort;
  }

  public getSnapshotUrl(): string {
    return `http://${this.boardIp}/?t=${Date.now()}`;
  }

  public connect(): void {
    if (this.ws) {
      try {
        this.ws.close();
      } catch {}
    }

    const wsUrl = `ws://${this.boardIp}:${this.wsPort}/`;
    try {
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        this.isConnected = true;
        this.lastSeen = Date.now();
        this.startPing();
        this.notifyTelemetry();
      };

      this.ws.onmessage = (event: WebSocketMessageEvent) => {
        this.lastSeen = Date.now();
        if (typeof event.data === 'string') {
          this.handleTextMessage(event.data);
        } else if (event.data instanceof ArrayBuffer) {
          this.handleBinaryAudio(event.data);
        }
      };

      this.ws.onerror = () => {
        // Handled in onclose
      };

      this.ws.onclose = () => {
        this.isConnected = false;
        this.stopPing();
        this.notifyTelemetry();
        this.scheduleReconnect();
      };
    } catch {
      this.scheduleReconnect();
    }
  }

  public disconnect(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    this.stopPing();
    if (this.ws) {
      try {
        this.ws.close();
      } catch {}
      this.ws = null;
    }
    this.isConnected = false;
    this.notifyTelemetry();
  }

  private scheduleReconnect(): void {
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.reconnectTimer = setTimeout(() => {
      this.connect();
    }, 4000);
  }

  private startPing(): void {
    this.stopPing();
    this.pingInterval = setInterval(() => {
      if (this.isConnected && this.ws?.readyState === WebSocket.OPEN) {
        this.lastPingTime = Date.now();
        this.sendJSON({cmd: 'ping', timestamp: this.lastPingTime});
      }
    }, 2000);
  }

  private stopPing(): void {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }

  public sendJSON(obj: Record<string, any>): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      try {
        this.ws.send(JSON.stringify(obj));
      } catch {}
    }
  }

  private handleTextMessage(dataStr: string): void {
    try {
      const msg = JSON.parse(dataStr);
      if (msg.cmd === 'pong' || msg.type === 'pong') {
        this.rttMs = Math.max(1, Date.now() - this.lastPingTime);
      }

      if (typeof msg.rssi === 'number') {
        this.updateRssi(msg.rssi);
      }
      this.notifyTelemetry();
    } catch {}
  }

  /**
   * Calculates estimated distance in meters from WiFi RSSI using Log-Distance Path Loss
   */
  public updateRssi(rawRssi: number): void {
    this.rssi = rawRssi;
    // Exponential smoothing
    this.smoothedRssi = this.smoothedRssi * 0.85 + this.rssi * 0.15;

    // Log-Distance Path Loss Model
    const exponent = (REFERENCE_RSSI_1M - this.smoothedRssi) / (10 * PATH_LOSS_EXPONENT);
    const dist = Math.pow(10, exponent);
    this.estimatedDistance = Math.max(0.2, Math.min(25.0, dist));
  }

  private handleBinaryAudio(arrayBuffer: ArrayBuffer): void {
    const int16Array = new Int16Array(arrayBuffer);
    if (int16Array.length === 0) return;

    let sumSquares = 0;
    for (let i = 0; i < int16Array.length; i++) {
      const norm = int16Array[i] / 32768.0;
      sumSquares += norm * norm;
    }
    const rms = Math.sqrt(sumSquares / int16Array.length);
    this.audioEnergy = this.audioEnergy * 0.7 + rms * 0.3;

    this.audioListeners.forEach(listener => listener(this.audioEnergy));
  }

  public toggleAudioStream(enable: boolean): void {
    this.isRecordingAudio = enable;
    this.sendJSON({cmd: enable ? 'start_audio' : 'stop_audio'});
  }

  public getTelemetry(): RoveTelemetry {
    return {
      boardIp: this.boardIp,
      wsPort: this.wsPort,
      isConnected: this.isConnected,
      rttMs: this.rttMs,
      rssi: Math.round(this.smoothedRssi),
      estimatedDistanceMeters: parseFloat(this.estimatedDistance.toFixed(2)),
      motionIndex: this.motionIndex,
      lastSeenTimestamp: this.lastSeen,
    };
  }

  public subscribeTelemetry(listener: RoveTelemetryListener): () => void {
    this.telemetryListeners.add(listener);
    listener(this.getTelemetry());
    return () => this.telemetryListeners.delete(listener);
  }

  public subscribeAudio(listener: RoveAudioListener): () => void {
    this.audioListeners.add(listener);
    return () => this.audioListeners.delete(listener);
  }

  private notifyTelemetry(): void {
    const data = this.getTelemetry();
    this.telemetryListeners.forEach(l => l(data));
  }
}

export const roveHardwareService = RoveHardwareService.getInstance();
