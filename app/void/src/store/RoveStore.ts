/**
 * PROJECT VOID OS // ROVE HARDWARE MOBX STORE
 * Reactive state management for Seeed Studio XIAO ESP32-S3 Sense companion node.
 */

import {makeAutoObservable, runInAction} from 'mobx';
import {roveHardwareService, RoveTelemetry} from '../services/rove';

class RoveStore {
  isConnected: boolean = false;
  boardIp: string = '192.168.0.106';
  wsPort: string = '81';
  rttMs: number = 0;
  rssi: number = -52;
  estimatedDistanceMeters: number = 1.0;
  motionIndex: number = 0;
  lastSeenTimestamp: number = 0;
  isAudioStreaming: boolean = false;
  audioEnergy: number = 0;

  private unsubscribeTelemetry: (() => void) | null = null;
  private unsubscribeAudio: (() => void) | null = null;

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  private async init() {
    const config = await roveHardwareService.loadSavedConfig();
    runInAction(() => {
      this.boardIp = config.ip;
      this.wsPort = config.port;
    });

    this.unsubscribeTelemetry = roveHardwareService.subscribeTelemetry(
      (telemetry: RoveTelemetry) => {
        runInAction(() => {
          this.isConnected = telemetry.isConnected;
          this.rttMs = telemetry.rttMs;
          this.rssi = telemetry.rssi;
          this.estimatedDistanceMeters = telemetry.estimatedDistanceMeters;
          this.motionIndex = telemetry.motionIndex;
          this.lastSeenTimestamp = telemetry.lastSeenTimestamp;
        });
      },
    );

    this.unsubscribeAudio = roveHardwareService.subscribeAudio(
      (energy: number) => {
        runInAction(() => {
          this.audioEnergy = energy;
        });
      },
    );

    // Auto-connect on app boot
    roveHardwareService.connect();
  }

  setBoardConfig = async (ip: string, port: string = '81') => {
    runInAction(() => {
      this.boardIp = ip;
      this.wsPort = port;
    });
    await roveHardwareService.setBoardConfig(ip, port);
  };

  connect = () => {
    roveHardwareService.connect();
  };

  disconnect = () => {
    roveHardwareService.disconnect();
  };

  toggleAudio = (enable: boolean) => {
    runInAction(() => {
      this.isAudioStreaming = enable;
    });
    roveHardwareService.toggleAudioStream(enable);
  };

  get snapshotUrl(): string {
    return roveHardwareService.getSnapshotUrl();
  }

  destroy = () => {
    this.unsubscribeTelemetry?.();
    this.unsubscribeAudio?.();
  };
}

export const roveStore = new RoveStore();
