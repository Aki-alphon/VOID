/**
 * PROJECT VOID OS // ROVE HARDWARE CLIENT (ESP32-S3 SENSE WEBSOCKET & AUDIO)
 * Handles:
 * - Live connection to ws://<board_ip>:<ws_port>
 * - Latency ping/pong calculations
 * - Binary 16kHz PCM audio buffer reception from onboard PDM microphone (GPIO 41/42)
 * - Telemetry state updates (Heap, PSRAM, RSSI, Camera FPS)
 */

class ESP32Client {
  constructor() {
    this.boardIp = localStorage.getItem('void_board_ip') || '192.168.0.106';
    this.wsPort = localStorage.getItem('void_ws_port') || '81';
    this.ws = null;
    this.isConnected = false;
    this.reconnectTimer = null;
    this.pingInterval = null;
    this.lastPingTime = 0;
    this.rtt = 0;

    // Audio Analysis
    this.audioEnergy = 0;
    this.fftData = new Uint8Array(64);
    this.isRecording = false;

    // Header Waveform Canvas
    this.headerCanvas = document.getElementById('headerWaveformCanvas');
    this.headerCtx = this.headerCanvas ? this.headerCanvas.getContext('2d') : null;

    // Voice Visualizer Canvas
    this.voiceCanvas = document.getElementById('voiceVisualizerCanvas');
    this.voiceCtx = this.voiceCanvas ? this.voiceCanvas.getContext('2d') : null;

    this.startOscilloscopeLoop();
  }

  connect() {
    if (this.ws) {
      try { this.ws.close(); } catch (e) {}
    }

    const wsUrl = `ws://${this.boardIp}:${this.wsPort}/`;
    console.log(`[ESP32Client] Connecting to ${wsUrl}...`);
    this.updateStatusUI(false, `CONNECTING // ${this.boardIp}:${this.wsPort}`);

    try {
      this.ws = new WebSocket(wsUrl);
      this.ws.binaryType = 'arraybuffer';

      this.ws.onopen = () => {
        console.log('[ESP32Client] Connected!');
        this.isConnected = true;
        this.updateStatusUI(true, `LINK ONLINE // ${this.boardIp}`);
        this.startPing();
      };

      this.ws.onmessage = (event) => {
        if (typeof event.data === 'string') {
          this.handleTextMessage(event.data);
        } else if (event.data instanceof ArrayBuffer) {
          this.handleBinaryAudio(event.data);
        }
      };

      this.ws.onerror = (err) => {
        console.warn('[ESP32Client] WebSocket Error:', err);
      };

      this.ws.onclose = () => {
        console.log('[ESP32Client] Disconnected.');
        this.isConnected = false;
        this.updateStatusUI(false, `OFFLINE // RETRYING LINK...`);
        this.stopPing();
        this.scheduleReconnect();
      };
    } catch (e) {
      this.scheduleReconnect();
    }
  }

  scheduleReconnect() {
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.reconnectTimer = setTimeout(() => {
      this.connect();
    }, 3500);
  }

  startPing() {
    this.stopPing();
    this.pingInterval = setInterval(() => {
      if (this.isConnected && this.ws.readyState === WebSocket.OPEN) {
        this.lastPingTime = performance.now();
        this.sendJSON({ cmd: 'ping', timestamp: Date.now() });
      }
    }, 2000);
  }

  stopPing() {
    if (this.pingInterval) clearInterval(this.pingInterval);
  }

  sendJSON(obj) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(obj));
    }
  }

  handleTextMessage(dataStr) {
    try {
      const msg = JSON.parse(dataStr);
      if (msg.cmd === 'pong') {
        this.rtt = Math.round(performance.now() - this.lastPingTime);
        const rttEl = document.getElementById('valPing');
        if (rttEl) rttEl.textContent = `${this.rtt} ms`;
        const linesEl = document.getElementById('rightTelemetryLines');
        if (linesEl && linesEl.children[5]) {
          linesEl.children[5].textContent = `WS_RTT: ${this.rtt}ms`;
        }
      }
    } catch (e) {}
  }

  handleBinaryAudio(arrayBuffer) {
    const int16Array = new Int16Array(arrayBuffer);
    const sampleCount = int16Array.length;
    if (sampleCount === 0) return;

    let sumSquares = 0;
    for (let i = 0; i < sampleCount; i++) {
      const norm = int16Array[i] / 32768.0;
      sumSquares += norm * norm;
    }
    const rms = Math.sqrt(sumSquares / sampleCount);
    this.audioEnergy = this.audioEnergy * 0.7 + rms * 0.3;

    if (window.singularityEngine) {
      window.singularityEngine.setAudioEnergy(Math.min(1.0, this.audioEnergy * 4.5));
    }

    const step = Math.floor(sampleCount / 64);
    for (let b = 0; b < 64; b++) {
      const sampleVal = Math.abs(int16Array[b * step] || 0) / 32768.0;
      this.fftData[b] = Math.min(255, Math.floor(sampleVal * 255 * (1 + (b / 64))));
    }
  }

  toggleAudioStream(enable) {
    this.isRecording = enable;
    this.sendJSON({ cmd: enable ? 'start_audio' : 'stop_audio' });

    const micIndicator = document.getElementById('micIndicator');
    const micIcon = document.getElementById('micIcon');
    if (micIndicator) micIndicator.className = enable ? 'mic-live-indicator pulsing' : 'mic-live-indicator';
    if (micIcon) {
      if (enable) micIcon.classList.add('active');
      else micIcon.classList.remove('active');
    }
  }

  updateStatusUI(isOnline, statusText) {
    const statusTextEl = document.getElementById('connectionStatusText');
    const wifiDotEl = document.getElementById('wifiDot');
    const wifiIconEl = document.getElementById('wifiIcon');

    if (statusTextEl) statusTextEl.textContent = statusText;
    if (wifiDotEl) wifiDotEl.className = isOnline ? 'status-pulse-dot online' : 'status-pulse-dot';
    if (wifiIconEl) {
      if (isOnline) wifiIconEl.classList.add('active');
      else wifiIconEl.classList.remove('active');
    }
  }

  startOscilloscopeLoop() {
    const draw = () => {
      this.renderHeaderWaveform();
      this.renderVoiceVisualizer();
      requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
  }

  // Nothing OS / UI Kit Segmented Dual-Color Equalizer (Matching Reference Image)
  renderHeaderWaveform() {
    if (!this.headerCtx) return;
    const ctx = this.headerCtx;
    const w = this.headerCanvas.width;
    const h = this.headerCanvas.height;

    ctx.clearRect(0, 0, w, h);

    const numBars = 36;
    const barWidth = 4;
    const gap = (w - (numBars * barWidth)) / (numBars - 1);
    const now = performance.now() * 0.004;

    for (let i = 0; i < numBars; i++) {
      let val = (this.fftData[i] || 0) / 255.0;
      if (!this.isRecording) {
        val = (Math.sin(now + i * 0.35) * 0.5 + 0.5) * 0.35 + 0.1;
      }

      const totalSegments = 8;
      const activeSegments = Math.max(1, Math.round(val * totalSegments));
      const segH = 2;
      const segGap = 1;
      const x = i * (barWidth + gap);

      for (let s = 0; s < totalSegments; s++) {
        const y = h - (s + 1) * (segH + segGap);
        if (s < activeSegments) {
          // Top segment red if near peak, otherwise white
          if (s >= totalSegments - 2) {
            ctx.fillStyle = '#ff2438';
            ctx.shadowColor = '#ff2438';
            ctx.shadowBlur = 4;
          } else {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.shadowBlur = 0;
          }
          ctx.fillRect(x, y, barWidth, segH);
        } else {
          // Dim inactive segment dot
          ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
          ctx.shadowBlur = 0;
          ctx.fillRect(x, y, barWidth, segH);
        }
      }
    }
  }

  renderVoiceVisualizer() {
    if (!this.voiceCtx) return;
    const ctx = this.voiceCtx;
    const w = this.voiceCanvas.width;
    const h = this.voiceCanvas.height;

    ctx.clearRect(0, 0, w, h);

    const bars = 48;
    const barW = (w / bars) - 2;
    const now = performance.now() * 0.003;

    for (let i = 0; i < bars; i++) {
      let val = (this.fftData[i] || 0) / 255.0;
      if (!this.isRecording) {
        val = (Math.sin(now + i * 0.3) * 0.5 + 0.5) * 0.12;
      }

      const barH = Math.max(4, val * (h - 12));
      const x = i * (barW + 2);
      const y = h - barH;

      const grad = ctx.createLinearGradient(0, y, 0, h);
      grad.addColorStop(0, '#ff2438');
      grad.addColorStop(0.7, 'rgba(255, 36, 56, 0.6)');
      grad.addColorStop(1, 'rgba(59, 8, 13, 0.4)');

      ctx.fillStyle = grad;
      ctx.fillRect(x, y, barW, barH);
    }
  }
}

window.esp32Client = new ESP32Client();
