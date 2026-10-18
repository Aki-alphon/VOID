/**
 * ==============================================================================
 * PROJECT VOID OS // XIAO ESP32-S3 SENSE OPERATING SYSTEM
 * Gundam RX-78-2 & Nothing OS Neural Kernel
 * ==============================================================================
 */

#include <Arduino.h>
#include "config.h"
#include "display_hud.h"
#include "camera_module.h"
#include "network_module.h"
#include "touch_module.h"

// Core Modules
DisplayHUD    hud;
CameraModule  camera;
NetworkModule net;
TouchModule   touch;

// Demo mode & cycle timer
bool demoMode = false;
unsigned long lastDemoSwitch = 0;
unsigned long lastCycle = 0;

// Solid Color Hardware Show Test (Can be enabled anytime with 'test' command)
bool colorTestMode = false;
int testColorIdx = 0;
unsigned long lastColorSwitch = 0;

struct ColorPreset {
  const char* name;
  uint16_t color;
  uint16_t textColor;
};

const ColorPreset COLOR_PRESETS[] = {
  {"BRIGHT RED",    0xF800, 0xFFFF},
  {"BRIGHT GREEN",  0x07E0, 0x0000},
  {"BRIGHT BLUE",   0x001F, 0xFFFF},
  {"GOLDEN YELLOW", 0xFFE0, 0x0000},
  {"CYAN TEAL",     0x07FF, 0x0000},
  {"VIVID MAGENTA", 0xF81F, 0xFFFF},
  {"PURE WHITE",    0xFFFF, 0x0000},
  {"DEEP BLACK",    0x0000, 0xFFFF}
};
const int NUM_PRESETS = 8;

void showSolidColor(uint16_t bg, uint16_t fg, const char* name) {
  hud.tft->fillScreen(bg);
  hud.tft->setTextSize(3);
  hud.tft->setTextColor(fg, bg);
  hud.tft->setCursor(30, 95);
  hud.tft->print(name);
  hud.tft->setTextSize(2);
  hud.tft->setCursor(30, 140);
  hud.tft->printf("HEX: 0x%04X", bg);
  Serial.printf("[Color Test] Solid Screen: %s (0x%04X)\n", name, bg);
}

// Centralized Tap Action Handler (shared by physical touch & virtual serial commands)
void handleTap(int16_t tx, int16_t ty) {
  lastCycle = millis();

  // 1. If an alert modal is showing, tap anywhere to dismiss
  if (hud.activeAlert) {
    hud.dismissAlert();
    return;
  }

  // 2. Top-Right "APPS" Button tapped (tx >= 270, ty <= 32)
  if (tx >= 270 && ty <= 32) {
    hud.setMode(MODE_APP_DRAWER);
    return;
  }

  // 3. Bottom Android Gesture Navigation Pill tapped (Home Action, ty >= 215, tx 100..220)
  if (ty >= 215 && tx >= 100 && tx <= 220) {
    hud.setMode(MODE_SINGULARITY_HUD);
    return;
  }

  // 4. In App Drawer (MODE_APP_DRAWER): Tap cards in 3x2 Landscape Grid
  if (hud.currentMode == MODE_APP_DRAWER) {
    // Top-right close button 'X' (tx >= 285, ty <= 42)
    if (tx >= 285 && ty <= 42) {
      hud.setMode(MODE_SINGULARITY_HUD);
      return;
    }

    // Row 1 (ty: 44 to 126)
    if (ty >= 44 && ty <= 126) {
      if (tx < 108) {
        hud.setMode(MODE_TACTICAL_OPTICS); // OPT-01
      } else if (tx <= 210) {
        hud.setMode(MODE_VOICE_COMMS);     // COM-02
      } else {
        hud.setMode(MODE_AI_MESSAGES);     // DAT-03
      }
      return;
    }

    // Row 2 (ty: 128 to 212)
    if (ty >= 128 && ty <= 212) {
      if (tx < 108) {
        hud.setMode(MODE_SPATIAL_RADAR);   // NAV-04
      } else if (tx <= 210) {
        hud.setMode(MODE_SYSTEM_METRICS);  // TLM-05
      } else {
        hud.triggerAlert("CONFIG", "XIAO ESP32-S3 // AP ACTIVE"); // CFG-06
      }
      return;
    }
  }

  // 5. On Singularity Core: Tap the black hole triggers Relativistic Plasma Energy Flare!
  if (hud.currentMode == MODE_SINGULARITY_HUD) {
    hud.triggerTouchPulse();
    return;
  }

  // 6. On any Tactical Mode: Tap gesture pill or top bar returns to Singularity Home
  if (ty >= 215 || ty <= 26) {
    hud.setMode(MODE_SINGULARITY_HUD);
  }
}

// Physical Touch Poller
void processTouch() {
  int16_t tx = 0, ty = 0;
  if (!touch.checkTap(tx, ty)) return;
  handleTap(tx, ty);
}

// Serial Command Processor for GUI testing & diagnostics
void processSerial() {
  if (!Serial.available()) return;
  String cmd = Serial.readStringUntil('\n');
  cmd.trim();
  if (cmd.length() == 0) return;

  if (cmd.equalsIgnoreCase("hud") || cmd == "0") {
    demoMode = false;
    hud.setMode(MODE_SINGULARITY_HUD);
  } else if (cmd.equalsIgnoreCase("drawer") || cmd == "1") {
    demoMode = false;
    hud.setMode(MODE_APP_DRAWER);
  } else if (cmd.equalsIgnoreCase("cam") || cmd.equalsIgnoreCase("optics") || cmd == "2") {
    demoMode = false;
    hud.setMode(MODE_TACTICAL_OPTICS);
  } else if (cmd.equalsIgnoreCase("audio") || cmd.equalsIgnoreCase("voice") || cmd == "3") {
    demoMode = false;
    hud.setMode(MODE_VOICE_COMMS);
  } else if (cmd.equalsIgnoreCase("messages") || cmd.equalsIgnoreCase("chat") || cmd == "4") {
    demoMode = false;
    hud.setMode(MODE_AI_MESSAGES);
  } else if (cmd.equalsIgnoreCase("radar") || cmd.equalsIgnoreCase("maps") || cmd == "5") {
    demoMode = false;
    hud.setMode(MODE_SPATIAL_RADAR);
  } else if (cmd.equalsIgnoreCase("metrics") || cmd == "6") {
    demoMode = false;
    hud.setMode(MODE_SYSTEM_METRICS);
  } else if (cmd.equalsIgnoreCase("next")) {
    demoMode = false;
    hud.setMode((OSMode)((hud.currentMode + 1) % MODE_COUNT));
  } else if (cmd.equalsIgnoreCase("demo")) {
    demoMode = !demoMode;
    lastDemoSwitch = millis();
    Serial.printf("[OS] Auto Demo Mode: %s\n", demoMode ? "ENABLED (Cycling every 4s)" : "DISABLED");
  } else if (cmd.startsWith("alert ")) {
    hud.triggerAlert("OPERATOR_MSG", cmd.substring(6).c_str());
  } else if (cmd.equalsIgnoreCase("touch off")) {
    touch.enabled = false;
    Serial.println(F("[Touch] Hardware touch polling DISABLED (Unconnected pins ignored)"));
  } else if (cmd.equalsIgnoreCase("touch on")) {
    touch.enabled = true;
    Serial.println(F("[Touch] Hardware touch polling ENABLED"));
  } else if (cmd.equalsIgnoreCase("tap flare")) {
    Serial.println(F("[Virtual Tap] Singularity Relativistic Flare (160, 120)"));
    handleTap(160, 120);
  } else if (cmd.equalsIgnoreCase("tap apps")) {
    Serial.println(F("[Virtual Tap] Top-Right APPS Button (300, 20)"));
    handleTap(300, 20);
  } else if (cmd.equalsIgnoreCase("tap home")) {
    Serial.println(F("[Virtual Tap] Bottom Navigation Pill (160, 225)"));
    handleTap(160, 225);
  } else if (cmd.equalsIgnoreCase("tap opt")) {
    Serial.println(F("[Virtual Tap] Card OPT-01 (50, 80)"));
    handleTap(50, 80);
  } else if (cmd.equalsIgnoreCase("tap com")) {
    Serial.println(F("[Virtual Tap] Card COM-02 (160, 80)"));
    handleTap(160, 80);
  } else if (cmd.equalsIgnoreCase("tap dat")) {
    Serial.println(F("[Virtual Tap] Card DAT-03 (260, 80)"));
    handleTap(260, 80);
  } else if (cmd.equalsIgnoreCase("tap nav")) {
    Serial.println(F("[Virtual Tap] Card NAV-04 (50, 160)"));
    handleTap(50, 160);
  } else if (cmd.equalsIgnoreCase("tap tlm")) {
    Serial.println(F("[Virtual Tap] Card TLM-05 (160, 160)"));
    handleTap(160, 160);
  } else if (cmd.equalsIgnoreCase("tap cfg")) {
    Serial.println(F("[Virtual Tap] Card CFG-06 (260, 160)"));
    handleTap(260, 160);
  } else if (cmd.equalsIgnoreCase("inv") || cmd.equalsIgnoreCase("invert")) {
    hud.toggleInvert();
    Serial.printf("[Display] Invert Mode: %s\n", hud.inverted ? "ENABLED" : "DISABLED");
  } else if (cmd.equalsIgnoreCase("red")) {
    colorTestMode = false;
    showSolidColor(0xF800, 0xFFFF, "BRIGHT RED");
  } else if (cmd.equalsIgnoreCase("green")) {
    colorTestMode = false;
    showSolidColor(0x07E0, 0x0000, "BRIGHT GREEN");
  } else if (cmd.equalsIgnoreCase("blue")) {
    colorTestMode = false;
    showSolidColor(0x001F, 0xFFFF, "BRIGHT BLUE");
  } else if (cmd.equalsIgnoreCase("yellow")) {
    colorTestMode = false;
    showSolidColor(0xFFE0, 0x0000, "GOLDEN YELLOW");
  } else if (cmd.equalsIgnoreCase("cyan")) {
    colorTestMode = false;
    showSolidColor(0x07FF, 0x0000, "CYAN TEAL");
  } else if (cmd.equalsIgnoreCase("magenta")) {
    colorTestMode = false;
    showSolidColor(0xF81F, 0xFFFF, "VIVID MAGENTA");
  } else if (cmd.equalsIgnoreCase("black")) {
    colorTestMode = false;
    showSolidColor(0x0000, 0xFFFF, "DEEP BLACK");
  } else if (cmd.equalsIgnoreCase("white")) {
    colorTestMode = false;
    showSolidColor(0xFFFF, 0x0000, "PURE WHITE");
  } else if (cmd.equalsIgnoreCase("test") || cmd.equalsIgnoreCase("colors") || cmd.equalsIgnoreCase("cycle")) {
    colorTestMode = true;
    lastColorSwitch = 0;
    Serial.println(F("[Color Test] Solid Color Auto-Cycle: STARTED (Cycling every 1.5s)"));
  } else if (cmd.equalsIgnoreCase("stop")) {
    colorTestMode = false;
    demoMode = false;
    hud.setMode(MODE_SINGULARITY_HUD);
    Serial.println(F("[OS] Color Test Stopped -> Returned to Singularity HUD"));
  } else if (cmd.equalsIgnoreCase("refresh") || cmd.equalsIgnoreCase("wake")) {
    hud.coreBackdropDrawn = false;
    hud.drawerDrawn = false;
    hud.lastMode = (OSMode)-1;
    hud.keepAlive();
    Serial.println(F("[OS] Display forced refresh and wake!"));
  } else if (cmd.startsWith("tap ")) {
    int spaceIdx = cmd.indexOf(' ', 4);
    if (spaceIdx > 0) {
      int tx = cmd.substring(4, spaceIdx).toInt();
      int ty = cmd.substring(spaceIdx + 1).toInt();
      Serial.printf("[Virtual Tap] Screen Coord (%d, %d)\n", tx, ty);
      handleTap(tx, ty);
    } else {
      Serial.println(F("[OS] Usage: tap <x> <y>  (e.g., tap 300 20)"));
    }
  } else {
    Serial.println(F("[OS] Commands:"));
    Serial.println(F("  Colors:  'red', 'green', 'blue', 'yellow', 'cyan', 'magenta', 'white', 'black'"));
    Serial.println(F("  Cycle:   'cycle' or 'test' (auto-cycles solid colors every 1.5s)"));
    Serial.println(F("  Screens: 'stop', 'hud', 'drawer', 'cam', 'voice', 'chat', 'radar', 'metrics', 'next'"));
    Serial.println(F("  Invert:  'inv' (toggle color polarity for IPS/TN)"));
    Serial.println(F("  Tap:     'tap <x> <y>', 'tap apps', 'tap home', 'tap flare', etc."));
  }
}

void setup() {
  Serial.begin(115200);
  delay(300);
  Serial.println(F("\n[OS] PROJECT VOID GUNDAM KERNEL BOOTING..."));

  // 1. Initialize Display on HSPI (10 MHz)
  hud.begin();

  // Instant hardware sanity check: Flash Red -> Green -> Blue immediately
  showSolidColor(0xF800, 0xFFFF, "BRIGHT RED");
  delay(350);
  showSolidColor(0x07E0, 0x0000, "BRIGHT GREEN");
  delay(350);
  showSolidColor(0x001F, 0xFFFF, "BRIGHT BLUE");
  delay(350);

  // Gundam RX-78-2 & Nothing OS Boot Splash
  hud.showSplash();

  // 2. Initialize Touch Screen Controller (shares HSPI bus, disabled by default)
  touch.begin(hud.spi);

  // 3. Initialize Camera (Non-blocking Sense B2B check)
  camera.begin();

  // 4. Initialize WiFi and REST API
  net.begin("AJAY", "Maroti@1980", "VOID-OS-NODE", "singularity",
    [](JsonDocument &doc) {
      doc["status"] = "ONLINE";
      doc["color_test"] = colorTestMode;
      doc["mode"] = (int)hud.currentMode;
      doc["heap_free"] = ESP.getFreeHeap();
      doc["psram_free"] = ESP.getFreePsram();
      doc["uptime"] = millis() / 1000;
      doc["camera"] = camera.initialized;
      doc["touch"] = touch.initialized;
      doc["inverted"] = hud.inverted;
      doc["touch_raw_x"] = touch.lastRawX;
      doc["touch_raw_y"] = touch.lastRawY;
      doc["touch_raw_z"] = touch.lastRawZ;
      doc["touch_screen_x"] = touch.lastScreenX;
      doc["touch_screen_y"] = touch.lastScreenY;
    },
    [](int m) {
      colorTestMode = false;
      if (m >= 0 && m < MODE_COUNT) hud.setMode((OSMode)m);
    },
    [](const char* title, const char* msg) {
      hud.triggerAlert(title, msg);
    },
    []() {
      hud.toggleInvert();
    }
  );

  Serial.println(F("[OS] PROJECT VOID OS KERNEL ACTIVE! (Type 'test' for solid colors, '1' for Apps)"));
}

void loop() {
  net.handle();
  processSerial();
  processTouch();

  if (colorTestMode) {
    if (millis() - lastColorSwitch >= 1500) {
      lastColorSwitch = millis();
      showSolidColor(COLOR_PRESETS[testColorIdx].color, 
                     COLOR_PRESETS[testColorIdx].textColor, 
                     COLOR_PRESETS[testColorIdx].name);
      testColorIdx = (testColorIdx + 1) % NUM_PRESETS;
    }
  } else {
    // Auto demo mode cycling (cycles every 4 seconds)
    if (demoMode && (millis() - lastDemoSwitch >= 4000)) {
      lastDemoSwitch = millis();
      hud.setMode((OSMode)((hud.currentMode + 1) % MODE_COUNT));
      Serial.printf("[Demo] Auto-switched to mode: %d\n", (int)hud.currentMode);
    }

    // Render Display (Singularity Core remains permanently locked on hero stage)
    hud.render(net.connected, camera);
  }

  delay(20);
}
