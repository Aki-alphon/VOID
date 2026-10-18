#pragma once
#include <Arduino.h>
#include <SPI.h>
#include "config.h"

class TouchModule {
public:
  SPIClass* spi = nullptr;
  bool initialized = false;
  bool enabled = false; // Disabled by default for safe headless/no-touch testing
  unsigned long lastTouchTime = 0;
  unsigned long lastPollTime = 0;
  const unsigned long DEBOUNCE_MS = 150;

  // Debug states
  int16_t lastRawX = 0;
  int16_t lastRawY = 0;
  int16_t lastRawZ = 0;
  int16_t lastScreenX = 0;
  int16_t lastScreenY = 0;

  bool begin(SPIClass* bus = nullptr) {
    spi = bus;

    // 1. Dedicated Touch CS (D2 / GPIO 3)
    pinMode(TOUCH_CS, OUTPUT);
    digitalWrite(TOUCH_CS, HIGH);

    // 2. Protect Display CS (D3 / GPIO 4) and RST (D1 / GPIO 2)
    pinMode(TFT_CS, OUTPUT);
    digitalWrite(TFT_CS, HIGH);

    pinMode(TFT_RST, OUTPUT);
    digitalWrite(TFT_RST, HIGH);

    // 3. Disable onboard microSD card on Sense board (GPIO 21)
    pinMode(21, OUTPUT);
    digitalWrite(21, HIGH);

    // 4. Ground MISO line to prevent floating noise when touch pins are disconnected
    pinMode(TFT_MISO, INPUT_PULLDOWN);

    initialized = true;
    Serial.println(F("[Touch] Touch Engine Ready (Use 'touch on' when wired)"));
    return true;
  }

  // Robust 24-clock bitwise SPI transfer for XPT2046 (immune to 16-bit endianness quirks)
  uint16_t readChannel(uint8_t cmd) {
    if (!spi) return 0;
    spi->transfer(cmd);
    uint8_t msb = spi->transfer(0x00);
    uint8_t lsb = spi->transfer(0x00);
    return (((uint16_t)(msb & 0x7F)) << 5) | (lsb >> 3);
  }

  // Polls XPT2046 over SPI with safe isolation
  bool checkTap(int16_t &screenX, int16_t &screenY) {
    if (!initialized || !enabled || !spi) return false;

    unsigned long now = millis();
    if (now - lastPollTime < 18) return false; // ~55 Hz poll rate
    lastPollTime = now;

    // 1. Isolate ILI9341 display
    digitalWrite(TFT_CS, HIGH);

    // 2. Begin touch SPI transaction at 2 MHz, MSBFIRST, SPI_MODE0
    spi->beginTransaction(SPISettings(2000000, MSBFIRST, SPI_MODE0));
    digitalWrite(TOUCH_CS, LOW);

    // Query pressure: Z1 (0xB1) and Z2 (0xC1) with reference powered ON
    uint16_t z1 = readChannel(0xB1);
    uint16_t z2 = readChannel(0xC1);
    int32_t z = (int32_t)z1 + 4095 - z2;

    uint16_t rawX = 0;
    uint16_t rawY = 0;

    // If pressed, query X (0x91) and Y (0xD1)
    if (z > 250) {
      rawX = readChannel(0x91);
      rawY = readChannel(0xD1);
    }

    // Power down touch ADC
    spi->transfer(0x00);

    digitalWrite(TOUCH_CS, HIGH);
    spi->endTransaction();

    // 3. Keep display CS HIGH
    digitalWrite(TFT_CS, HIGH);

    // 4. Validate reading
    if (z > 250 && rawX > 150 && rawY > 150 && rawX < 3950 && rawY < 3950) {
      lastRawX = rawX;
      lastRawY = rawY;
      lastRawZ = z;

      if (now - lastTouchTime < DEBOUNCE_MS) {
        return false; // Debounce
      }
      lastTouchTime = now;

      // In Landscape (320x240):
      // On SmartElex 2.8" SPI TFT, the resistive glass coordinates map as:
      int16_t mappedX = map(rawX, TS_MAXX, TS_MINX, 0, 320);
      int16_t mappedY = map(rawY, TS_MINY, TS_MAXY, 0, 240);

      screenX = constrain(mappedX, 0, 319);
      screenY = constrain(mappedY, 0, 239);
      lastScreenX = screenX;
      lastScreenY = screenY;

      Serial.printf("[Touch] Tap registered: rawX=%d, rawY=%d, z=%d -> Screen=(%d, %d)\n", rawX, rawY, (int)z, screenX, screenY);
      return true;
    }

    return false;
  }
};
