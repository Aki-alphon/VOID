#pragma once
#include <Arduino.h>
#include <Adafruit_GFX.h>
#include <Adafruit_ILI9341.h>
#include "config.h"
#include "camera_module.h"
#include "singularity_dots.h"

#define HUD_NUM_SWIRL_KNOTS   16

struct SwirlKnot {
  int dotIndex;
  int16_t prevX;
  int16_t prevY;
  uint8_t prevSize;
  uint16_t prevColor;
};

class DisplayHUD {
public:
  Adafruit_ILI9341* tft = nullptr;
  SPIClass* spi = nullptr;
  OSMode currentMode = MODE_SINGULARITY_HUD;
  OSMode lastMode = (OSMode)-1;

  // Animation States
  float swirlPhase = 0.0f;
  float pulseEnergy = 0.0f;
  bool coreBackdropDrawn = false;
  bool drawerDrawn = false;

  SwirlKnot swirlKnots[HUD_NUM_SWIRL_KNOTS];

  // Alerts
  bool activeAlert = false;
  char alertTitle[24] = "";
  char alertMessage[48] = "";
  unsigned long alertTime = 0;

  // Status Clock
  unsigned long lastClockSec = 0xFFFFFFFF;
  bool inverted = false;

  void begin(SPIClass* bus = nullptr);
  void showSplash();
  void setMode(OSMode mode);
  void toggleInvert() {
    inverted = !inverted;
    if (tft) tft->invertDisplay(inverted);
  }
  void triggerTouchPulse() {
    pulseEnergy = 1.0f;
  }
  void keepAlive() {
    if (tft) {
      tft->sendCommand(ILI9341_SLPOUT);
      tft->sendCommand(ILI9341_DISPON);
    }
  }
  void triggerAlert(const char* title, const char* msg);
  void dismissAlert() { activeAlert = false; }

  void render(bool wifiOk, CameraModule &cam);

private:
  void drawAndroidStatusBar(bool wifiOk);
  void drawBottomDock();
  void drawAndroidNavPill();
  void drawQuantumDotSingularity();
  void animateGargantua();
  void drawAppDrawer();
  void drawTacticalOptics(CameraModule &cam);
  void drawVoiceComms();
  void drawAiMessages();
  void drawSpatialRadar();
  void drawSystemMetrics(bool wifiOk, bool camOk);
  void drawAlertOverlay();
  void drawGundamTriBar(int x, int y);
};
