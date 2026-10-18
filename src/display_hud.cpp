#include "display_hud.h"
#include <math.h>

void DisplayHUD::begin(SPIClass* bus) {
  // 1. Isolate Touch CS so XPT2046 never interferes with display startup
  pinMode(TOUCH_CS, OUTPUT);
  digitalWrite(TOUCH_CS, HIGH);

  // 2. Disable onboard Sense MicroSD CS (GPIO 21)
  pinMode(21, OUTPUT);
  digitalWrite(21, HIGH);

  // 3. Hardware reset the display
  pinMode(TFT_RST, OUTPUT);
  digitalWrite(TFT_RST, HIGH);
  delay(50);
  digitalWrite(TFT_RST, LOW);
  delay(100);
  digitalWrite(TFT_RST, HIGH);
  delay(200);

  // Explicit pin configurations
  pinMode(TFT_DC, OUTPUT);
  pinMode(TFT_CS, OUTPUT);
  digitalWrite(TFT_CS, HIGH);

  // 4. Initialize dedicated HSPI (SPI3) on official XIAO pins (SS handled by Adafruit driver in software)
  if (!bus) {
    static SPIClass defaultHspi(HSPI);
    defaultHspi.begin(TFT_SCLK, TFT_MISO, TFT_MOSI, -1);
    bus = &defaultHspi;
  }
  spi = bus;

  tft = new Adafruit_ILI9341(spi, TFT_DC, TFT_CS, TFT_RST);
  tft->begin(4000000); // 4 MHz for rock-solid signal integrity over jumper wires
  tft->setRotation(1);  // 320x240 Landscape
  tft->invertDisplay(false);
  tft->fillScreen(COLOR_NT_VOID);

  // Initialize swirl knot highlights
  for (int i = 0; i < HUD_NUM_SWIRL_KNOTS; i++) {
    swirlKnots[i].dotIndex = (i * (NUM_MATRIX_DOTS / HUD_NUM_SWIRL_KNOTS)) % NUM_MATRIX_DOTS;
    swirlKnots[i].prevX = -1;
    swirlKnots[i].prevY = -1;
    swirlKnots[i].prevSize = 1;
    swirlKnots[i].prevColor = COLOR_NT_VOID;
  }
}

void DisplayHUD::showSplash() {
  tft->fillScreen(COLOR_NT_VOID);

  // Blueprint Outer Box
  tft->drawRect(8, 8, 304, 224, COLOR_NT_BORDER);
  tft->drawRect(10, 10, 300, 220, COLOR_NT_MUTED);

  // Gundam Tri-Bar at Top Left
  drawGundamTriBar(20, 20);

  // Quantum Dot Singularity Icon in Center
  tft->fillCircle(160, 95, 24, COLOR_NT_CHARCOAL);
  tft->drawCircle(160, 95, 25, COLOR_NT_AMBER);
  tft->drawCircle(160, 95, 26, COLOR_NT_WHITE);
  tft->fillCircle(160, 95, 18, COLOR_NT_VOID);

  // Title
  tft->setTextSize(2);
  tft->setTextColor(COLOR_NT_WHITE, COLOR_NT_VOID);
  tft->setCursor(84, 140);
  tft->print(F("PROJECT VOID"));

  tft->setTextSize(1);
  tft->setTextColor(COLOR_NT_AMBER, COLOR_NT_VOID);
  tft->setCursor(76, 166);
  tft->print(F("RX-78-2 // NEURAL OPERATOR HUD"));

  tft->setTextColor(COLOR_NT_SILVER, COLOR_NT_VOID);
  tft->setCursor(90, 186);
  tft->print(F("XIAO ESP32-S3 SENSE"));

  delay(1100);
}

void DisplayHUD::setMode(OSMode mode) {
  if (currentMode != mode) {
    currentMode = mode;
    coreBackdropDrawn = false;
    drawerDrawn = false;
  }
}

void DisplayHUD::triggerAlert(const char* title, const char* msg) {
  strncpy(alertTitle, title, sizeof(alertTitle) - 1);
  strncpy(alertMessage, msg, sizeof(alertMessage) - 1);
  activeAlert = true;
  alertTime = millis();
}

void DisplayHUD::drawGundamTriBar(int x, int y) {
  tft->fillRect(x,      y, 4, 12, COLOR_GUNDAM_BLUE);
  tft->fillRect(x + 6,  y, 4, 12, COLOR_GUNDAM_YELLOW);
  tft->fillRect(x + 12, y, 4, 12, COLOR_GUNDAM_RED);
}

void DisplayHUD::render(bool wifiOk, CameraModule &cam) {
  // Protect display SPI bus by holding Touch CS HIGH
  digitalWrite(TOUCH_CS, HIGH);

  bool modeChanged = (currentMode != lastMode);
  if (modeChanged) {
    tft->fillRect(0, 22, 320, 218, COLOR_NT_VOID);
    lastMode = currentMode;
    lastClockSec = 0xFFFFFFFF; // force status bar repaint
    coreBackdropDrawn = false;
    drawerDrawn = false;
  }

  // Render Android Status Bar (top 22 px)
  drawAndroidStatusBar(wifiOk);

  // Render Active Mode
  switch (currentMode) {
    case MODE_SINGULARITY_HUD:
      if (!coreBackdropDrawn) {
        drawQuantumDotSingularity();
        drawAndroidNavPill();
        coreBackdropDrawn = true;
      }
      if (pulseEnergy > 0.05f) {
        animateGargantua();
      }
      break;

    case MODE_APP_DRAWER:
      if (!drawerDrawn) {
        drawAppDrawer();
        drawAndroidNavPill();
        drawerDrawn = true;
      }
      break;

    case MODE_TACTICAL_OPTICS:
      drawTacticalOptics(cam);
      drawAndroidNavPill();
      break;

    case MODE_VOICE_COMMS:
      drawVoiceComms();
      drawAndroidNavPill();
      break;

    case MODE_AI_MESSAGES:
      drawAiMessages();
      drawAndroidNavPill();
      break;

    case MODE_SPATIAL_RADAR:
      drawSpatialRadar();
      drawAndroidNavPill();
      break;

    case MODE_SYSTEM_METRICS:
      drawSystemMetrics(wifiOk, cam.initialized);
      drawAndroidNavPill();
      break;

    default:
      break;
  }

  drawAlertOverlay();
}

// ==================== 1. ANDROID STATUS BAR (TOP, 320x22) ====================
void DisplayHUD::drawAndroidStatusBar(bool wifiOk) {
  unsigned long curSec = millis() / 1000;
  if (curSec == lastClockSec) return;
  lastClockSec = curSec;

  tft->fillRect(0, 0, 320, 22, COLOR_NT_VOID);
  tft->drawFastHLine(0, 21, 320, COLOR_NT_MUTED);

  // Status Clock on Left ("09:41" matching index.html)
  tft->setTextSize(1);
  tft->setTextColor(COLOR_NT_WHITE, COLOR_NT_VOID);
  tft->setCursor(8, 7);
  int mins = (curSec / 60) % 60;
  char timeBuf[12];
  snprintf(timeBuf, sizeof(timeBuf), "09:%02d", (41 + mins) % 60);
  tft->print(timeBuf);

  // WiFi Dot-Matrix Glyph
  int wx = 216;
  if (wifiOk) {
    tft->fillCircle(wx + 4, 15, 1, COLOR_NT_RED_VIVID);
    tft->drawPixel(wx + 1, 11, COLOR_NT_WHITE);
    tft->drawPixel(wx + 4, 10, COLOR_NT_WHITE);
    tft->drawPixel(wx + 7, 11, COLOR_NT_WHITE);
    tft->drawPixel(wx - 2, 7,  COLOR_NT_WHITE);
    tft->drawPixel(wx + 4, 6,  COLOR_NT_WHITE);
    tft->drawPixel(wx + 10, 7, COLOR_NT_WHITE);
  } else {
    tft->fillCircle(wx + 4, 15, 1, COLOR_NT_MUTED);
    tft->drawPixel(wx + 4, 10, COLOR_NT_MUTED);
  }

  // Bluetooth Dot-Matrix Glyph
  int bx = 236;
  tft->drawPixel(bx + 3, 5,  COLOR_NT_WHITE);
  tft->drawPixel(bx + 5, 8,  COLOR_NT_WHITE);
  tft->fillCircle(bx + 3, 11, 1, COLOR_NT_RED_VIVID);
  tft->drawPixel(bx + 1, 8,  COLOR_NT_WHITE);
  tft->drawPixel(bx + 1, 14, COLOR_NT_WHITE);
  tft->drawPixel(bx + 5, 14, COLOR_NT_WHITE);
  tft->drawPixel(bx + 3, 17, COLOR_NT_WHITE);

  // Battery Capsule: 82%
  tft->setTextColor(COLOR_NT_WHITE, COLOR_NT_VOID);
  tft->setCursor(252, 7);
  tft->print(F("82%"));

  tft->drawRoundRect(272, 6, 12, 10, 2, COLOR_NT_BORDER);
  tft->fillRect(284, 9, 1, 4, COLOR_NT_BORDER);
  tft->fillCircle(275, 11, 1, COLOR_NT_AMBER);
  tft->fillCircle(278, 11, 1, COLOR_NT_AMBER);
  tft->fillCircle(281, 11, 1, COLOR_NT_RED_VIVID);

  // Applications Hub Button at Far Right Corner (X: 286 to 316, Y: 3 to 18)
  tft->fillRoundRect(286, 3, 32, 15, 2, COLOR_NT_CHARCOAL);
  tft->drawRoundRect(286, 3, 32, 15, 2, COLOR_NT_BORDER);
  tft->fillCircle(290, 7, 1, COLOR_NT_WHITE);
  tft->fillCircle(294, 7, 1, COLOR_NT_WHITE);
  tft->fillCircle(290, 11, 1, COLOR_NT_WHITE);
  tft->fillCircle(294, 11, 1, COLOR_NT_RED_VIVID); // Red dot center matching Nothing OS glyph
  tft->setCursor(298, 7);
  tft->setTextColor(COLOR_NT_WHITE, COLOR_NT_CHARCOAL);
  tft->print(F("APP"));
}

// ==================== 2. ANDROID GESTURE NAVIGATION PILL ====================
void DisplayHUD::drawAndroidNavPill() {
  tft->fillRoundRect(136, 233, 48, 4, 2, COLOR_NT_WHITE);
}

// ==================== 3. QUANTUM DOT-MATRIX GARGANTUA RASTERIZER ====================
void DisplayHUD::drawQuantumDotSingularity() {
  // Clear hero stage
  tft->fillRect(0, 22, 320, 208, COLOR_NT_VOID);

  // Render all precomputed quantum phosphor dots
  for (int i = 0; i < NUM_MATRIX_DOTS; i++) {
    int16_t x     = pgm_read_word(&(SINGULARITY_DOTS[i].x));
    int16_t y     = pgm_read_word(&(SINGULARITY_DOTS[i].y));
    uint8_t sz    = pgm_read_byte(&(SINGULARITY_DOTS[i].size));
    uint16_t col  = pgm_read_word(&(SINGULARITY_DOTS[i].baseColor));

    if (sz == 1) {
      tft->drawPixel(x, y, col);
    } else {
      tft->fillRect(x, y, 2, 2, col);
    }
  }
}

// ==================== 4. LIVE GYROSCOPIC ANIMATION (MATCHING SINGULARITY.JS) ====================
void DisplayHUD::animateGargantua() {
  const int cx = 160;
  const int cy = 120;

  swirlPhase += 0.045f * (1.0f + pulseEnergy * 1.2f);

  // -------------------------------------------------------------
  // A. Accretion Disk Keplerian Swirl Highlights (Lossless Dot Animation)
  // -------------------------------------------------------------
  for (int k = 0; k < HUD_NUM_SWIRL_KNOTS; k++) {
    // 1. Restore previously highlighted dot to its base color
    if (swirlKnots[k].prevX >= 0) {
      if (swirlKnots[k].prevSize == 1) {
        tft->drawPixel(swirlKnots[k].prevX, swirlKnots[k].prevY, swirlKnots[k].prevColor);
      } else {
        tft->fillRect(swirlKnots[k].prevX, swirlKnots[k].prevY, 2, 2, swirlKnots[k].prevColor);
      }
    }

    // 2. Advance knot along the dot stream
    swirlKnots[k].dotIndex = (swirlKnots[k].dotIndex + 3) % NUM_MATRIX_DOTS;
    int idx = swirlKnots[k].dotIndex;

    int16_t x     = pgm_read_word(&(SINGULARITY_DOTS[idx].x));
    int16_t y     = pgm_read_word(&(SINGULARITY_DOTS[idx].y));
    uint8_t sz    = pgm_read_byte(&(SINGULARITY_DOTS[idx].size));
    uint16_t base = pgm_read_word(&(SINGULARITY_DOTS[idx].baseColor));

    swirlKnots[k].prevX = x;
    swirlKnots[k].prevY = y;
    swirlKnots[k].prevSize = sz;
    swirlKnots[k].prevColor = base;

    // Draw glowing surge in incandescent white or hot amber
    uint16_t surge = (x < cx) ? COLOR_NT_WHITE : COLOR_NT_AMBER_HOT;
    if (sz == 1) {
      tft->drawPixel(x, y, surge);
    } else {
      tft->fillRect(x, y, 2, 2, surge);
    }
  }

  // B. Interactive Touch Flare Shockwave
  if (pulseEnergy > 0.05f) {
    pulseEnergy -= 0.12f;
    if (pulseEnergy <= 0.05f) {
      pulseEnergy = 0.0f;
    }
  }
}

// ==================== 5. GUNDAM RX-78-2 MECHA APP DRAWER (LANDSCAPE 320x240) ====================
void DisplayHUD::drawAppDrawer() {
  tft->fillRect(0, 22, 320, 218, COLOR_NT_VOID);

  drawGundamTriBar(12, 28);

  tft->setTextSize(1);
  tft->setTextColor(COLOR_NT_WHITE, COLOR_NT_VOID);
  tft->setCursor(34, 30);
  tft->print(F("RX-78-2 // MOBILE SUIT CORES"));

  tft->setTextColor(COLOR_NT_AMBER, COLOR_NT_VOID);
  tft->setCursor(248, 30);
  tft->print(F("WB-102"));

  tft->setTextColor(COLOR_NT_WHITE, COLOR_NT_CHARCOAL);
  tft->fillRoundRect(296, 26, 16, 14, 2, COLOR_NT_CHARCOAL);
  tft->drawRoundRect(296, 26, 16, 14, 2, COLOR_NT_BORDER);
  tft->setCursor(301, 29);
  tft->print(F("X"));

  tft->drawFastHLine(10, 44, 300, COLOR_NT_BORDER);

  // 6 Mecha App Cards in a 3x2 Grid (Width 96, Height 76)
  struct AppCardDef {
    int x, y;
    const char* code;
    const char* name;
    uint16_t accent;
  };

  AppCardDef cards[6] = {
    { 10,  48,  "OPT-01", "OPTICS FEED",   COLOR_NT_MINT },
    { 112, 48,  "COM-02", "VOICE COMMS",   COLOR_NT_AMBER },
    { 214, 48,  "DAT-03", "AI MESSAGES",   COLOR_NT_STEEL },
    { 10,  132, "NAV-04", "SPATIAL RADAR", COLOR_NT_STEEL },
    { 112, 132, "TLM-05", "TELEMETRY",     COLOR_NT_AMBER },
    { 214, 132, "CFG-06", "SETTINGS",      COLOR_NT_CRIMSON }
  };

  for (int i = 0; i < 6; i++) {
    int x = cards[i].x;
    int y = cards[i].y;

    tft->fillRect(x, y, 96, 76, COLOR_NT_CHARCOAL);
    tft->drawRect(x, y, 96, 76, COLOR_NT_BORDER);

    tft->setTextSize(1);
    tft->setTextColor(cards[i].accent, COLOR_NT_CHARCOAL);
    tft->setCursor(x + 6, y + 6);
    tft->print(cards[i].code);
    tft->fillCircle(x + 88, y + 8, 1, COLOR_NT_MUTED);

    int icx = x + 48;
    int icy = y + 38;
    if (i == 0) {
      tft->drawCircle(icx, icy, 14, cards[i].accent);
      tft->drawCircle(icx, icy, 6, COLOR_NT_WHITE);
    } else if (i == 1) {
      tft->drawRect(icx - 14, icy - 10, 28, 20, COLOR_NT_BORDER);
      tft->drawFastHLine(icx - 10, icy - 4, 20, cards[i].accent);
      tft->drawFastHLine(icx - 10, icy,     20, cards[i].accent);
      tft->drawFastHLine(icx - 10, icy + 4, 20, cards[i].accent);
    } else if (i == 2) {
      tft->drawLine(icx - 14, icy + 10, icx, icy - 10, cards[i].accent);
      tft->drawLine(icx + 14, icy + 10, icx, icy - 10, cards[i].accent);
      tft->fillCircle(icx, icy + 4, 3, COLOR_NT_AMBER);
    } else if (i == 3) {
      tft->drawCircle(icx, icy, 14, cards[i].accent);
      tft->drawFastHLine(icx - 16, icy, 32, cards[i].accent);
      tft->drawFastVLine(icx, icy - 16, 32, cards[i].accent);
      tft->fillCircle(icx + 6, icy - 4, 2, COLOR_NT_AMBER);
    } else if (i == 4) {
      tft->drawRect(icx - 12, icy - 10, 24, 20, COLOR_NT_BORDER);
      tft->fillRect(icx - 6, icy + 2, 4, 6, COLOR_NT_STEEL);
      tft->fillRect(icx,     icy - 2, 4, 10, COLOR_NT_AMBER);
      tft->fillRect(icx + 6, icy - 6, 4, 14, COLOR_NT_CRIMSON);
    } else {
      tft->drawCircle(icx, icy, 12, cards[i].accent);
      tft->drawCircle(icx, icy, 5, COLOR_NT_WHITE);
    }

    tft->setTextColor(COLOR_NT_WHITE, COLOR_NT_CHARCOAL);
    tft->setCursor(x + 8, y + 62);
    tft->print(cards[i].name);
  }
}

// ==================== 6. TACTICAL SUB-SCREENS (LANDSCAPE 320x240) ====================
void DisplayHUD::drawTacticalOptics(CameraModule &cam) {
  tft->drawRect(6, 26, 308, 198, COLOR_NT_BORDER);
  tft->drawFastHLine(10, 42, 300, COLOR_NT_MUTED);

  tft->setTextSize(1);
  tft->setTextColor(COLOR_NT_MINT, COLOR_NT_VOID);
  tft->setCursor(14, 30);
  tft->print(F("OPT-01 // TACTICAL OPTICS FEED"));

  tft->setTextColor(COLOR_NT_SILVER, COLOR_NT_VOID);
  tft->setCursor(220, 30);
  tft->print(F("PORT :80 STREAM"));

  if (!cam.initialized) {
    tft->drawRect(60, 68, 200, 120, COLOR_NT_BORDER);
    tft->setTextColor(COLOR_NT_AMBER, COLOR_NT_VOID);
    tft->setCursor(80, 110);
    tft->print(F("STANDALONE OPTICS MODE"));

    tft->setTextColor(COLOR_NT_MUTED, COLOR_NT_VOID);
    tft->setCursor(76, 130);
    tft->print(F("Sense B2B Camera Standby"));
  }

  // Crosshairs & Grid HUD
  int cx = 160;
  int cy = 126;
  tft->drawCircle(cx, cy, 26, COLOR_NT_BORDER);
  tft->drawFastHLine(cx - 38, cy, 76, COLOR_NT_MUTED);
  tft->drawFastVLine(cx, cy - 38, 76, COLOR_NT_MUTED);
  tft->drawCircle(cx, cy, 3, COLOR_NT_MINT);
}

void DisplayHUD::drawVoiceComms() {
  tft->drawRect(6, 26, 308, 198, COLOR_NT_BORDER);
  tft->drawFastHLine(10, 42, 300, COLOR_NT_MUTED);

  tft->setTextSize(1);
  tft->setTextColor(COLOR_NT_AMBER, COLOR_NT_VOID);
  tft->setCursor(14, 30);
  tft->print(F("COM-02 // VOICE OPERATOR"));

  tft->setTextColor(COLOR_NT_SILVER, COLOR_NT_VOID);
  tft->setCursor(215, 30);
  tft->print(F("I2S PDM 16kHz"));

  int cx = 160;
  int cy = 115;
  tft->drawCircle(cx, cy, 38, COLOR_NT_BORDER);
  tft->drawCircle(cx, cy, 28, COLOR_NT_AMBER);
  tft->drawCircle(cx, cy, 18, COLOR_NT_WHITE);
  tft->fillCircle(cx, cy, 8, COLOR_NT_AMBER_HOT);

  tft->setTextColor(COLOR_NT_WHITE, COLOR_NT_VOID);
  tft->setCursor(96, 170);
  tft->print(F("MIC ACTIVE // LISTENING"));

  tft->setTextColor(COLOR_NT_MUTED, COLOR_NT_VOID);
  tft->setCursor(70, 188);
  tft->print(F("GPIO 41 DATA / GPIO 42 CLK"));
}

void DisplayHUD::drawAiMessages() {
  tft->drawRect(6, 26, 308, 198, COLOR_NT_BORDER);
  tft->drawFastHLine(10, 42, 300, COLOR_NT_MUTED);

  tft->setTextSize(1);
  tft->setTextColor(COLOR_NT_STEEL, COLOR_NT_VOID);
  tft->setCursor(14, 30);
  tft->print(F("DAT-03 // VOID NEURAL COMMS"));

  tft->setTextColor(COLOR_NT_AMBER, COLOR_NT_VOID);
  tft->setCursor(225, 30);
  tft->print(F("P2P AES-GCM"));

  tft->fillRect(14, 52, 292, 126, COLOR_NT_CHARCOAL);
  tft->drawRect(14, 52, 292, 126, COLOR_NT_BORDER);

  tft->setTextColor(COLOR_NT_AMBER, COLOR_NT_CHARCOAL);
  tft->setCursor(22, 60);
  tft->print(F("SYS // VOID KERNEL"));

  tft->setTextColor(COLOR_NT_WHITE, COLOR_NT_CHARCOAL);
  tft->setCursor(22, 80);
  tft->print(F("Neural core operational. Sense optical feed"));
  tft->setCursor(22, 94);
  tft->print(F("link established. Honesty: 90%, Humor: 75%."));
  tft->setCursor(22, 108);
  tft->print(F("Ready for operator instruction."));

  tft->drawFastHLine(14, 150, 292, COLOR_NT_BORDER);
  tft->setTextColor(COLOR_NT_AMBER, COLOR_NT_CHARCOAL);
  tft->setCursor(22, 158);
  tft->print(F("CMD > awaiting tactical command..."));
}

void DisplayHUD::drawSpatialRadar() {
  tft->drawRect(6, 26, 308, 198, COLOR_NT_BORDER);
  tft->drawFastHLine(10, 42, 300, COLOR_NT_MUTED);

  tft->setTextSize(1);
  tft->setTextColor(COLOR_NT_STEEL, COLOR_NT_VOID);
  tft->setCursor(14, 30);
  tft->print(F("NAV-04 // HKO-TYPE PPI RADAR"));

  tft->setTextColor(COLOR_NT_AMBER, COLOR_NT_VOID);
  tft->setCursor(215, 30);
  tft->print(F("2.4GHz RF CSI"));

  int cx = 160;
  int cy = 126;
  tft->drawCircle(cx, cy, 68, COLOR_NT_MUTED);
  tft->drawCircle(cx, cy, 48, COLOR_NT_BORDER);
  tft->drawCircle(cx, cy, 28, COLOR_NT_BORDER);
  tft->drawCircle(cx, cy, 10, COLOR_NT_AMBER);
  tft->drawFastHLine(cx - 72, cy, 144, COLOR_NT_MUTED);
  tft->drawFastVLine(cx, cy - 72, 144, COLOR_NT_MUTED);

  // Blip
  tft->fillCircle(cx + 26, cy - 22, 3, COLOR_NT_RED_VIVID);
  tft->drawCircle(cx + 26, cy - 22, 6, COLOR_NT_AMBER);

  tft->setTextColor(COLOR_NT_WHITE, COLOR_NT_VOID);
  tft->setCursor(14, 204);
  tft->print(F("TARGET: 1.48M // RSSI: -48dBm"));
}

void DisplayHUD::drawSystemMetrics(bool wifiOk, bool camOk) {
  tft->drawRect(6, 26, 308, 198, COLOR_NT_BORDER);
  tft->drawFastHLine(10, 42, 300, COLOR_NT_MUTED);

  tft->setTextSize(1);
  tft->setTextColor(COLOR_NT_AMBER, COLOR_NT_VOID);
  tft->setCursor(14, 30);
  tft->print(F("TLM-05 // HARDWARE TELEMETRY"));

  tft->setTextColor(COLOR_NT_SILVER, COLOR_NT_VOID);
  tft->setCursor(240, 30);
  tft->print(F("REALTIME"));

  // 4 Telemetry Cards
  // Card 1: Heap
  tft->fillRect(14, 52, 140, 68, COLOR_NT_CHARCOAL);
  tft->drawRect(14, 52, 140, 68, COLOR_NT_BORDER);
  tft->setTextColor(COLOR_NT_SILVER, COLOR_NT_CHARCOAL);
  tft->setCursor(20, 60);
  tft->print(F("INTERNAL HEAP"));
  tft->setTextColor(COLOR_NT_WHITE, COLOR_NT_CHARCOAL);
  tft->setTextSize(2);
  tft->setCursor(20, 76);
  tft->printf("%dK", ESP.getFreeHeap() / 1024);
  tft->setTextSize(1);
  tft->drawRect(20, 102, 126, 6, COLOR_NT_MUTED);
  tft->fillRect(20, 102, 85, 6, COLOR_NT_AMBER);

  // Card 2: PSRAM
  tft->fillRect(166, 52, 140, 68, COLOR_NT_CHARCOAL);
  tft->drawRect(166, 52, 140, 68, COLOR_NT_BORDER);
  tft->setTextColor(COLOR_NT_SILVER, COLOR_NT_CHARCOAL);
  tft->setCursor(172, 60);
  tft->print(F("OCTAL PSRAM"));
  tft->setTextColor(COLOR_NT_WHITE, COLOR_NT_CHARCOAL);
  tft->setTextSize(2);
  tft->setCursor(172, 76);
  tft->printf("%dM", ESP.getFreePsram() / (1024 * 1024));
  tft->setTextSize(1);
  tft->drawRect(172, 102, 126, 6, COLOR_NT_MUTED);
  tft->fillRect(172, 102, 105, 6, COLOR_NT_STEEL);

  // Card 3: CPU
  tft->fillRect(14, 128, 140, 68, COLOR_NT_CHARCOAL);
  tft->drawRect(14, 128, 140, 68, COLOR_NT_BORDER);
  tft->setTextColor(COLOR_NT_SILVER, COLOR_NT_CHARCOAL);
  tft->setCursor(20, 136);
  tft->print(F("XTENSA LX7 CPU"));
  tft->setTextColor(COLOR_NT_WHITE, COLOR_NT_CHARCOAL);
  tft->setTextSize(2);
  tft->setCursor(20, 152);
  tft->printf("%dM", ESP.getCpuFreqMHz());
  tft->setTextSize(1);
  tft->setTextColor(COLOR_NT_MUTED, COLOR_NT_CHARCOAL);
  tft->setCursor(20, 178);
  tft->print(F("Dual-Core 240MHz"));

  // Card 4: Connectivity
  tft->fillRect(166, 128, 140, 68, COLOR_NT_CHARCOAL);
  tft->drawRect(166, 128, 140, 68, COLOR_NT_BORDER);
  tft->setTextColor(COLOR_NT_SILVER, COLOR_NT_CHARCOAL);
  tft->setCursor(172, 136);
  tft->print(F("NETWORK & CAM"));
  tft->setTextColor(wifiOk ? COLOR_NT_GREEN : COLOR_NT_CRIMSON, COLOR_NT_CHARCOAL);
  tft->setCursor(172, 154);
  tft->print(wifiOk ? F("WiFi: 192.168.0.105") : F("WiFi: OFFLINE"));
  tft->setTextColor(camOk ? COLOR_NT_GREEN : COLOR_NT_MUTED, COLOR_NT_CHARCOAL);
  tft->setCursor(172, 172);
  tft->print(camOk ? F("Sense Camera: OK") : F("Sense Camera: N/A"));
}

void DisplayHUD::drawAlertOverlay() {
  if (!activeAlert) return;

  if (millis() - alertTime > 4000) {
    activeAlert = false;
    coreBackdropDrawn = false;
    drawerDrawn = false;
    return;
  }

  tft->fillRect(20, 80, 280, 80, COLOR_NT_CHARCOAL);
  tft->drawRect(20, 80, 280, 80, COLOR_NT_AMBER);
  tft->drawRect(22, 82, 276, 76, COLOR_NT_MUTED);

  tft->setTextSize(1);
  tft->setTextColor(COLOR_NT_AMBER_HOT, COLOR_NT_CHARCOAL);
  tft->setCursor(32, 92);
  tft->print(alertTitle);

  tft->setTextColor(COLOR_NT_WHITE, COLOR_NT_CHARCOAL);
  tft->setCursor(32, 114);
  tft->print(alertMessage);

  tft->setTextColor(COLOR_NT_SILVER, COLOR_NT_CHARCOAL);
  tft->setCursor(32, 138);
  tft->print(F("[Tap anywhere to dismiss]"));
}
