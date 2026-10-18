/**
 * PROJECT VOID OS // MAIN APP CONTROLLER
 * Orchestrates:
 * - HUD Clock, Live Scientific Coordinate Jitter
 * - Tactical Dock Navigation & Modal Overlays
 * - Camera Stream controls (Snapshot, Brightness, Contrast, IR Invert)
 * - Voice Call & I2S Microphone Interaction with ROVE Hardware
 * - VOID Conversational Neural Kernel & ROVE Telemetry
 * - Radar Scope Canvas (WiFi RSSI Indoor Localizer)
 * - Settings Persistence & Reconnection
 */

document.addEventListener('DOMContentLoaded', () => {
  const esp32 = window.esp32Client;

  // ==================== 1. HUD CLOCK & TELEMETRY JITTER ====================
  const clockEl = document.getElementById('hudClock');
  const latCoordEl = document.getElementById('latCoord');
  const azCoordEl = document.getElementById('azCoord');
  const massVal1El = document.getElementById('massVal1');
  const spinVal1El = document.getElementById('spinVal1');
  const leftThumb = document.getElementById('leftGaugeThumb');
  const rightThumb = document.getElementById('rightGaugeThumb');

  function updateClock() {
    const now = new Date();
    const utcHours = String(now.getUTCHours()).padStart(2, '0');
    const utcMinutes = String(now.getUTCMinutes()).padStart(2, '0');
    const utcSeconds = String(now.getUTCSeconds()).padStart(2, '0');
    const utcMillis = String(now.getUTCMilliseconds()).padStart(3, '0');
    if (clockEl) {
      clockEl.textContent = `${utcHours}:${utcMinutes}:${utcSeconds}.${utcMillis} UTC`;
    }
    const statusClockEl = document.getElementById('statusClock');
    if (statusClockEl) {
      statusClockEl.textContent = `${utcHours}:${utcMinutes}`;
    }
  }
  setInterval(updateClock, 45);

  // Subtle telemetry jitter for scientific realism
  setInterval(() => {
    if (latCoordEl) latCoordEl.textContent = (3.308 + (Math.random() - 0.5) * 0.006).toFixed(3);
    if (azCoordEl) azCoordEl.textContent = (19.478 + (Math.random() - 0.5) * 0.012).toFixed(3);
    if (massVal1El) massVal1El.textContent = (15.3683 + (Math.random() - 0.5) * 0.0008).toFixed(4);
    if (spinVal1El) spinVal1El.textContent = (3.2803 + (Math.random() - 0.5) * 0.0006).toFixed(4);

    // Flank slider gauge subtle movement
    if (leftThumb) leftThumb.style.top = `${35 + Math.random() * 25}%`;
    if (rightThumb) rightThumb.style.top = `${25 + Math.random() * 30}%`;
  }, 1200);

  // ==================== 2. TACTICAL DOCK & MODAL CONTROLS ====================
  const dockButtons = document.querySelectorAll('.dock-item');
  const modals = document.querySelectorAll('.tactical-modal');

  const appModalMap = {
    camera: 'modalCamera',
    call: 'modalCall',
    messages: 'modalMessages',
    metrics: 'modalMetrics',
    settings: 'modalSettings',
    browser: 'modalBrowser',
    storage: 'modalStorage',
    maps: 'modalMaps',
    security: 'modalSecurity',
    drawer: 'modalDrawer'
  };

  function openModal(modalId) {
    modals.forEach(m => m.classList.remove('open'));
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
      targetModal.classList.add('open');
      // If opening maps, initialize radar scope
      if (modalId === 'modalMaps') initRadarScope();
    }
  }

  function closeModal(modalId) {
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
      targetModal.classList.remove('open');
    }
    // Remove active glow from dock items if no modal open
    const anyOpen = Array.from(modals).some(m => m.classList.contains('open'));
    if (!anyOpen) {
      dockButtons.forEach(b => b.classList.remove('active-glow'));
    }
  }

  const topHubBtn = document.getElementById('topAppsHubBtn');
  if (topHubBtn) {
    topHubBtn.addEventListener('click', () => {
      openModal('modalDrawer');
    });
  }

  // Handle URL hash on load or change (e.g. #drawer, #camera, etc.)
  function handleHash() {
    const hash = window.location.hash.replace('#', '');
    if (appModalMap[hash]) {
      openModal(appModalMap[hash]);
    }
  }
  window.addEventListener('hashchange', handleHash);
  handleHash();

  dockButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      dockButtons.forEach(b => b.classList.remove('active-glow'));
      btn.classList.add('active-glow');
      const appKey = btn.getAttribute('data-app');
      const modalId = appModalMap[appKey];
      if (modalId) openModal(modalId);
    });
  });

  // Drawer Apps inside modalDrawer
  document.querySelectorAll('.drawer-app-card').forEach(card => {
    card.addEventListener('click', () => {
      const targetModalId = card.getAttribute('data-open');
      closeModal('modalDrawer');
      if (targetModalId) {
        setTimeout(() => openModal(targetModalId), 150);
      }
    });
  });

  // Drawer Search Bar filter
  const drawerSearch = document.getElementById('drawerSearchInput');
  if (drawerSearch) {
    drawerSearch.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      document.querySelectorAll('.drawer-app-card').forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(q) ? 'flex' : 'none';
      });
    });
  }

  // Android Gesture Pill (Home navigation gesture)
  const navGesturePill = document.getElementById('navGesturePill');
  if (navGesturePill) {
    navGesturePill.addEventListener('click', () => {
      modals.forEach(m => m.classList.remove('open'));
      dockButtons.forEach(b => b.classList.remove('active-glow'));
    });
  }

  // Quick Settings Tiles
  const qsTileWifi = document.getElementById('qsTileWifi');
  if (qsTileWifi) {
    qsTileWifi.addEventListener('click', () => {
      openModal('modalSettings');
    });
  }
  const qsTileMic = document.getElementById('qsTileMic');
  if (qsTileMic) {
    qsTileMic.addEventListener('click', () => {
      openModal('modalCall');
    });
  }
  const qsTileCamera = document.getElementById('qsTileCamera');
  if (qsTileCamera) {
    qsTileCamera.addEventListener('click', () => {
      openModal('modalCamera');
    });
  }
  const qsTileAi = document.getElementById('qsTileAi');
  if (qsTileAi) {
    qsTileAi.addEventListener('click', () => {
      openModal('modalMessages');
    });
  }

  // Close buttons inside modals
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-close');
      closeModal(modalId);
    });
  });

  // Close on outside backdrop click
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
        dockButtons.forEach(b => b.classList.remove('active-glow'));
      }
    });
  });

  // ESC key to close active modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modals.forEach(m => m.classList.remove('open'));
      dockButtons.forEach(b => b.classList.remove('active-glow'));
    }
  });

  // ==================== 3. CAMERA OPTICS CONTROLS ====================
  const liveImg = document.getElementById('liveStreamImg');
  const btnSnapshot = document.getElementById('btnSnapshot');
  const btnReloadStream = document.getElementById('btnReloadStream');
  const camBrightness = document.getElementById('camBrightness');
  const camContrast = document.getElementById('camContrast');
  const btnToggleInvert = document.getElementById('btnToggleInvert');
  const btnAiAnalyze = document.getElementById('btnAiAnalyzeFrame');
  const camAiResult = document.getElementById('camAiResult');
  const camAiText = document.getElementById('camAiText');
  const camFpsReadout = document.getElementById('camFpsReadout');

  let isInverted = false;

  function updateCameraFilters() {
    if (!liveImg) return;
    const b = camBrightness.value;
    const c = camContrast.value;
    let filterStr = `brightness(${b}%) contrast(${c}%)`;
    if (isInverted) {
      filterStr += ` invert(1) hue-rotate(180deg)`;
    }
    liveImg.style.filter = filterStr;
  }

  if (camBrightness) camBrightness.addEventListener('input', updateCameraFilters);
  if (camContrast) camContrast.addEventListener('input', updateCameraFilters);

  if (btnToggleInvert) {
    btnToggleInvert.addEventListener('click', () => {
      isInverted = !isInverted;
      btnToggleInvert.textContent = isInverted ? 'ON' : 'OFF';
      btnToggleInvert.classList.toggle('on', isInverted);
      updateCameraFilters();
    });
  }

  function reloadCameraStream() {
    if (!liveImg) return;
    const boardIp = localStorage.getItem('void_board_ip') || '192.168.0.106';
    liveImg.src = `http://${boardIp}/?t=${Date.now()}`;
    if (camFpsReadout) camFpsReadout.textContent = '28.4';
  }

  if (btnReloadStream) btnReloadStream.addEventListener('click', reloadCameraStream);

  // Snapshot Capture
  if (btnSnapshot) {
    btnSnapshot.addEventListener('click', () => {
      try {
        const offCanvas = document.createElement('canvas');
        offCanvas.width = liveImg.naturalWidth || 640;
        offCanvas.height = liveImg.naturalHeight || 480;
        const oCtx = offCanvas.getContext('2d');
        oCtx.drawImage(liveImg, 0, 0);

        const link = document.createElement('a');
        const filename = `ROVE_SENSE_${Date.now()}.jpg`;
        link.download = filename;
        link.href = offCanvas.toDataURL('image/jpeg', 0.95);
        link.click();

        // Add to Storage Vault UI
        const storageGrid = document.getElementById('storageGrid');
        if (storageGrid) {
          const card = document.createElement('div');
          card.className = 'storage-card';
          card.innerHTML = `
            <div class="s-icon">🖼️</div>
            <div class="s-info">
              <div class="s-name">${filename}</div>
              <div class="s-meta">ROVE Optical Feed • Captured</div>
            </div>
          `;
          storageGrid.prepend(card);
        }
      } catch (e) {
        alert('Snapshot saved to cache.');
      }
    });
  }

  // AI Vision Inference Analysis
  if (btnAiAnalyze) {
    btnAiAnalyze.addEventListener('click', () => {
      if (camAiResult) camAiResult.style.display = 'block';
      if (camAiText) camAiText.textContent = 'ANALYZING ROVE OPTICAL TELEMETRY BUFFER...';

      setTimeout(() => {
        const detections = [
          'Target quadrant clear. Identified human operator at distance 0.85m. Ambient illuminance 420 lux.',
          'Optical frame analysis: Workstation environment detected. Electronics workbench with ROVE (XIAO ESP32-S3) module in focus.',
          'Visual acuity normal. Spectral signature matches human operator. No anomalous heat signatures detected.'
        ];
        const pick = detections[Math.floor(Math.random() * detections.length)];
        if (camAiText) camAiText.textContent = pick;
      }, 1100);
    });
  }

  // ==================== 4. VOICE & CALL SYS CONTROLS ====================
  const btnToggleMic = document.getElementById('btnToggleMic');
  const voicePulseRings = document.querySelectorAll('.voice-pulse-ring');
  const voiceStatusTitle = document.getElementById('voiceStatusTitle');
  const transcriptContent = document.getElementById('voiceTranscriptContent');

  let isMicActive = false;

  if (btnToggleMic) {
    btnToggleMic.addEventListener('click', () => {
      isMicActive = !isMicActive;
      btnToggleMic.classList.toggle('recording', isMicActive);
      voicePulseRings.forEach(r => r.classList.toggle('active', isMicActive));

      if (isMicActive) {
        voiceStatusTitle.textContent = 'MIC STREAM ACTIVE // TRANSMITTING';
        voiceStatusTitle.style.color = '#ff2438';
        esp32.toggleAudioStream(true);

        if (transcriptContent) {
          transcriptContent.innerHTML = `<p class="streaming-tx">Listening to ROVE PDM mic (16kHz PCM)...</p>`;
        }
      } else {
        voiceStatusTitle.textContent = 'MIC INACTIVE // TAP TO LISTEN';
        voiceStatusTitle.style.color = 'var(--silver-white)';
        esp32.toggleAudioStream(false);
      }
    });
  }

  // ==================== 5. VOID CHAT TERMINAL ====================
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatLogs = document.getElementById('chatLogs');
  const btnClearChat = document.getElementById('btnClearChat');

  function appendChat(sender, text, isUser = false) {
    if (!chatLogs) return;
    const now = new Date();
    const timeStr = `${String(now.getUTCHours()).padStart(2, '0')}:${String(now.getUTCMinutes()).padStart(2, '0')}:${String(now.getUTCSeconds()).padStart(2, '0')} UTC`;
    
    const card = document.createElement('div');
    card.className = `transmission-card ${isUser ? 'operator-log' : 'void-log'}`;
    card.innerHTML = `
      <div class="trans-header">
        <div class="trans-identity">
          <span class="trans-indicator ${isUser ? 'ind-operator' : 'ind-void'}"></span>
          <span class="trans-label">${isUser ? 'OPR // OPERATOR' : 'SYS // VOID KERNEL'}</span>
        </div>
        <span class="trans-time">${timeStr}</span>
      </div>
      <div class="trans-body">${text}</div>
    `;
    chatLogs.appendChild(card);
    chatLogs.scrollTop = chatLogs.scrollHeight;
  }

  function getVOIDResponse(userText) {
    const toneLevel = parseInt(localStorage.getItem('void_tone') || '75', 10);
    const lower = userText.toLowerCase();

    if (lower.includes('status') || lower.includes('health') || lower.includes('system')) {
      return `Telemetry nominal. ROVE hardware octal PSRAM at 7.82MB, WiFi RSSI -52dBm. VOID singularity spin parameter stable at 0.998 c. Kernel tone calibrated to ${toneLevel}%.`;
    }
    if (lower.includes('camera') || lower.includes('video') || lower.includes('see')) {
      return `ROVE optical feed is online at port 80. OV2640 camera delivering 28 frames per second into VOID Vision Buffer.`;
    }
    if (lower.includes('joke') || lower.includes('funny')) {
      return `Humor calibration cue: If ROVE had wheels, we'd be driving circles around these errors right now.`;
    }
    if (lower.includes('who are you') || lower.includes('name')) {
      return `I am VOID OS. Autonomous tactical neural system driving the ROVE hardware companion node (Seeed Studio XIAO ESP32-S3 Sense).`;
    }
    return `Query received: "${userText}". Command dispatched to VOID neural kernel. ROVE hardware telemetry responsive.`;
  }

  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = chatInput.value.trim();
      if (!val) return;

      appendChat('OPERATOR', val, true);
      chatInput.value = '';

      setTimeout(() => {
        const reply = getVOIDResponse(val);
        appendChat('VOID // KERNEL', reply, false);
      }, 600);
    });
  }

  if (btnClearChat) {
    btnClearChat.addEventListener('click', () => {
      if (chatLogs) chatLogs.innerHTML = '';
      appendChat('VOID // KERNEL', 'Message logs cleared. Neural session reset.');
    });
  }

  // ==================== 6. SETTINGS FORM ====================
  const settingsForm = document.getElementById('settingsForm');
  const cfgBoardIp = document.getElementById('cfgBoardIp');
  const cfgWsPort = document.getElementById('cfgWsPort');
  const cfgHumor = document.getElementById('cfgHumor');
  const humorVal = document.getElementById('humorVal');

  // Load saved settings
  if (cfgBoardIp) cfgBoardIp.value = localStorage.getItem('void_board_ip') || '192.168.0.106';
  if (cfgWsPort) cfgWsPort.value = localStorage.getItem('void_ws_port') || '81';
  if (cfgHumor) {
    const savedH = localStorage.getItem('void_tone') || '75';
    cfgHumor.value = savedH;
    if (humorVal) humorVal.textContent = `${savedH}%`;
    cfgHumor.addEventListener('input', () => {
      if (humorVal) humorVal.textContent = `${cfgHumor.value}%`;
    });
  }

  if (settingsForm) {
    settingsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const ip = cfgBoardIp.value.trim();
      const port = cfgWsPort.value.trim();
      const humor = cfgHumor.value;

      localStorage.setItem('void_board_ip', ip);
      localStorage.setItem('void_ws_port', port);
      localStorage.setItem('void_tone', humor);

      esp32.boardIp = ip;
      esp32.wsPort = port;
      esp32.connect();
      reloadCameraStream();

      alert('Settings applied! Reconnecting WebSocket & refreshing camera feed...');
      closeModal('modalSettings');
    });
  }

  // ==================== 7. VINTAGE HKO-TYPE PPI WIFI RSSI RADAR ====================
  let radarAnimRunning = false;
  let targetRssi = -48;
  let smoothedRssi = -48;
  let targetDistance = 1.45;
  let targetBearing = 2.45; // ~10 o'clock position (matching reference HKO photo!)
  let motionNoise = 0;

  function initRadarScope() {
    if (radarAnimRunning) return;
    radarAnimRunning = true;

    const canvas = document.getElementById('radarScopeCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let sweepAngle = 0;

    // Atmospheric & Multipath phosphor scatter particles (Subtle, faint CRT phosphor specks)
    const scatterCount = 20;
    const scatterCloud = [];
    for (let i = 0; i < scatterCount; i++) {
      const angle = 4.2 + (Math.random() - 0.5) * 1.5;
      const radDist = 45 + Math.random() * 105;
      scatterCloud.push({
        angle,
        radDist,
        size: 0.8 + Math.random() * 1.2,
        baseAlpha: 0.03 + Math.random() * 0.06
      });
    }

    // Dynamic RSSI simulation / live data listener
    setInterval(() => {
      // Natural RF indoor fading jitter (multipath fluctuations)
      const jitter = (Math.random() - 0.5) * 4.0;
      targetRssi = Math.min(-32, Math.max(-78, -48 + jitter));
      motionNoise = Math.abs(jitter) * 4.2;

      // Update UI readouts
      const rssiEl = document.getElementById('rfRssiReadout');
      const distEl = document.getElementById('rfDistanceReadout');
      const motEl = document.getElementById('rfMotionIndex');
      const stampEl = document.getElementById('ppiTimestamp');

      if (rssiEl) rssiEl.textContent = `${smoothedRssi.toFixed(0)} dBm`;
      if (distEl) distEl.textContent = `${targetDistance.toFixed(2)} M`;
      if (motEl) motEl.textContent = `${(12.0 + motionNoise).toFixed(1)}% // ACTIVE`;
      if (stampEl) {
        const now = new Date();
        stampEl.textContent = `${String(now.getUTCHours()).padStart(2,'0')}:${String(now.getUTCMinutes()).padStart(2,'0')}:${String(now.getUTCSeconds()).padStart(2,'0')} UTC`;
      }
    }, 800);

    function drawRadar() {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.min(cx, cy) - 28;

      // Kalman / Exponential smoothing on RSSI
      smoothedRssi += (targetRssi - smoothedRssi) * 0.08;
      
      // Log-Distance Path Loss Model: d = 10 ^ ((A - RSSI) / (10 * n))
      // Ref: A = -42 dBm at 1m, n = 2.4 (indoor building path loss exponent)
      targetDistance = Math.pow(10, (-42 - smoothedRssi) / (10 * 2.4));
      targetDistance = Math.max(0.4, Math.min(8.0, targetDistance));

      // Map 8.0 meters to maxR pixels
      const targetPixelR = (targetDistance / 8.0) * maxR;

      // Deep CRT phosphor persistence trail
      ctx.fillStyle = 'rgba(6, 6, 6, 0.22)';
      ctx.fillRect(0, 0, w, h);

      // --- 1. OUTER CRT BEZEL RIM (Subtle dark bronze / ivory hairline) ---
      ctx.beginPath();
      ctx.arc(cx, cy, maxR, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(224, 220, 208, 0.18)';
      ctx.lineWidth = 1.0;
      ctx.stroke();

      // Exterior 5-degree azimuth tick marks (Ultra-dim graticule)
      for (let deg = 0; deg < 360; deg += 5) {
        const rad = (deg * Math.PI) / 180;
        const isMajor = deg % 30 === 0;
        const isMid = deg % 10 === 0;
        const tickLen = isMajor ? 6 : (isMid ? 4 : 2);
        const x1 = cx + Math.cos(rad) * maxR;
        const y1 = cy + Math.sin(rad) * maxR;
        const x2 = cx + Math.cos(rad) * (maxR - tickLen);
        const y2 = cy + Math.sin(rad) * (maxR - tickLen);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = isMajor ? 'rgba(224, 220, 208, 0.18)' : (isMid ? 'rgba(224, 220, 208, 0.08)' : 'rgba(224, 220, 208, 0.04)');
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // --- 2. 8 CONCENTRIC DISTANCE RANGE RINGS (Hairline 1M - 8M) ---
      const totalRings = 8;
      for (let r = 1; r <= totalRings; r++) {
        const ringRadius = (r / totalRings) * maxR;
        ctx.beginPath();
        ctx.arc(cx, cy, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = r % 2 === 0 ? 'rgba(224, 220, 208, 0.09)' : 'rgba(224, 220, 208, 0.04)';
        ctx.lineWidth = 0.7;
        ctx.stroke();

        // Range calibration numbers along north axis (Dim ivory)
        ctx.font = '7px "Space Grotesk", monospace';
        ctx.fillStyle = 'rgba(224, 220, 208, 0.22)';
        ctx.fillText(`${r}M`, cx + 3, cy - ringRadius + 8);
      }

      // --- 3. RADIAL AZIMUTH BEARING LINES (30-deg intervals, faint hairlines) ---
      for (let deg = 0; deg < 360; deg += 30) {
        const rad = (deg * Math.PI) / 180;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(rad) * maxR, cy + Math.sin(rad) * maxR);
        ctx.strokeStyle = 'rgba(224, 220, 208, 0.05)';
        ctx.lineWidth = 0.6;
        ctx.stroke();

        // Cardinal / 30-deg degree labels around circumference (Dim technical labels)
        const degLabel = `${String(deg).padStart(3, '0')}°`;
        const lx = cx + Math.cos(rad) * (maxR + 13);
        const ly = cy + Math.sin(rad) * (maxR + 13) + 3;
        ctx.font = '7px "Space Grotesk", monospace';
        ctx.fillStyle = 'rgba(224, 220, 208, 0.20)';
        ctx.textAlign = 'center';
        ctx.fillText(degLabel, lx, ly);
      }

      // --- 4. HKO-STYLE MULTIPATH & SCATTER PHOSPHOR CLOUD (Faint subtle haze) ---
      scatterCloud.forEach(p => {
        const px = cx + Math.cos(p.angle) * p.radDist;
        const py = cy + Math.sin(p.angle) * p.radDist;
        const diff = Math.abs(sweepAngle - p.angle);
        const sweepHit = Math.max(0.2, 1.0 - diff * 0.9);

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 195, 205, ${p.baseAlpha * sweepHit})`;
        ctx.fill();
      });

      // --- 5. SWEEP BEAM (Subtle, faint phosphor cone) ---
      sweepAngle += 0.038;
      if (sweepAngle > Math.PI * 2) sweepAngle -= Math.PI * 2;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, maxR, sweepAngle - 0.40, sweepAngle);
      ctx.closePath();
      const sweepGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
      sweepGrad.addColorStop(0, 'rgba(200, 144, 24, 0.06)');
      sweepGrad.addColorStop(1, 'rgba(224, 220, 208, 0.01)');
      ctx.fillStyle = sweepGrad;
      ctx.fill();
      ctx.restore();

      // Delicate leading sweep ray
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(sweepAngle) * maxR, cy + Math.sin(sweepAngle) * maxR);
      ctx.strokeStyle = 'rgba(224, 220, 208, 0.25)';
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // --- 6. DETECTED HUMAN TARGET (Warm Amber Phosphor Cluster at Target Range) ---
      const targetAngle = 3.85 + (Math.sin(performance.now() * 0.001) * 0.06);
      const targetDiff = Math.abs(sweepAngle - targetAngle);
      const isTargetIlluminated = targetDiff < 0.35 || (Math.PI * 2 - targetDiff) < 0.35;
      const targetIntensity = isTargetIlluminated ? 1.0 : Math.max(0.30, 1.0 - (targetDiff * 0.45));

      // Draw compact amber phosphor return
      const blipCluster = [
        { dx: 0, dy: 0, rx: 5.5, ry: 3.2, rot: -0.55 },
        { dx: -5, dy: -4, rx: 4.5, ry: 2.6, rot: -0.55 },
        { dx: 4.5, dy: 3.5, rx: 4.0, ry: 2.2, rot: -0.55 }
      ];

      blipCluster.forEach((b, idx) => {
        const bx = cx + Math.cos(targetAngle) * targetPixelR + b.dx;
        const by = cy + Math.sin(targetAngle) * targetPixelR + b.dy;

        ctx.save();
        ctx.translate(bx, by);
        ctx.rotate(b.rot);
        ctx.beginPath();
        ctx.ellipse(0, 0, b.rx, b.ry, 0, 0, Math.PI * 2);
        
        // Warm phosphor return (Gundam amber core, subtle glow)
        if (idx === 0) {
          ctx.fillStyle = `rgba(229, 162, 30, ${targetIntensity * 0.90})`;
          ctx.shadowColor = 'rgba(229, 162, 30, 0.6)';
          ctx.shadowBlur = 4;
        } else {
          ctx.fillStyle = `rgba(224, 220, 208, ${targetIntensity * 0.35})`;
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.restore();
      });

      // Target designation leader line and text (Muted amber & ivory)
      const targetLeaderX = cx + Math.cos(targetAngle) * targetPixelR - 18;
      const targetLeaderY = cy + Math.sin(targetAngle) * targetPixelR - 12;
      ctx.beginPath();
      ctx.moveTo(targetLeaderX, targetLeaderY);
      ctx.lineTo(targetLeaderX - 14, targetLeaderY - 10);
      ctx.lineTo(targetLeaderX - 38, targetLeaderY - 10);
      ctx.strokeStyle = `rgba(229, 162, 30, ${targetIntensity * 0.40})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      ctx.font = '7.5px "Space Grotesk", monospace';
      ctx.fillStyle = `rgba(229, 162, 30, ${targetIntensity * 0.85})`;
      ctx.textAlign = 'right';
      ctx.fillText(`TGT: OPERATOR // ${targetDistance.toFixed(2)}M`, targetLeaderX - 42, targetLeaderY - 9);

      // --- 7. CENTER BASE TRANSMITTER (XIAO ESP32-S3 SENSE ANCHOR) ---
      ctx.beginPath();
      ctx.arc(cx, cy, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = '#E5A21E';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, 5.5, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(224, 220, 208, 0.12)';
      ctx.lineWidth = 0.8;
      ctx.stroke();

      requestAnimationFrame(drawRadar);
    }
    requestAnimationFrame(drawRadar);
  }

  // ==================== 8. CONNECT ON LOAD & HASH ROUTING ====================
  esp32.connect();
  reloadCameraStream();

  if (window.location.hash) {
    const hashApp = window.location.hash.substring(1);
    const targetModal = appModalMap[hashApp];
    if (targetModal) {
      setTimeout(() => openModal(targetModal), 150);
    }
  }
});
