# XIAO ESP32S3 to TFT Display & Touch Wiring Guide

This guide covers how to connect your **SmartElex 2.8" SPI TFT 240x320** (ILI9341 display + XPT2046 touch controller) to the **Seeed Studio XIAO ESP32S3** while the Sense expansion board is attached.

---

## 1. Display Header Connections (ILI9341 SPI - Landscape 320x240)

| Display Pin | XIAO ESP32S3 Pin | GPIO | Function Description |
| :--- | :--- | :--- | :--- |
| **VCC** | **5V** | 5V | Main power input (Powers display onboard 3.3V LDO regulator). |
| **GND** | **GND** | GND | Ground common. |
| **CS** | **D3** | GPIO 4 | Display SPI Chip Select. |
| **RESET** | **D1** | GPIO 2 | Hardware reset (kept driven HIGH by firmware). |
| **DC** | **D6** | GPIO 43 | Data / Command selector pin. |
| **SDI (MOSI)** | **D10** | GPIO 9 | SPI Data line (MOSI). |
| **SCK** | **D8** | GPIO 7 | SPI Clock line (SCK). |
| **LED** | **3V3** | 3.3V | Backlight power (connect to 3.3V). |
| **SDO (MISO)** | **LEAVE DISCONNECTED** | - | **UNPLUG THIS WIRE!** Display is write-only. If connected alongside Touch T_DO, it creates an SPI bus short that can freeze the screen. |

---

## 2. Touch Header Connections (XPT2046 Touch Controller)

Your display features a dedicated 5-pin `TOUCH` header on the bottom:

| Touch Pin | XIAO ESP32S3 Pin | GPIO | Function Description |
| :--- | :--- | :--- | :--- |
| **T_CLK** | **D8** (Shared) | GPIO 7 | Touch SPI Clock (Shares SCK bus line with display). |
| **T_DIN** | **D10** (Shared) | GPIO 9 | Touch SPI MOSI / Data In (Shares MOSI bus line with display). |
| **T_DO** | **D9** | GPIO 8 | Touch SPI MISO / Data Out (Dedicated MISO line). |
| **T_CS** | **D2** | GPIO 3 | Dedicated Touch Chip Select (Active LOW). |
| **T_IRQ** | **LEAVE DISCONNECTED** | - | **UNPLUG THIS WIRE!** The firmware uses dedicated hardware SPI pressure polling. Leaving T_IRQ disconnected eliminates any chance of pin crosstalk pulling RESET LOW into a white screen! |

---

## 3. Landscape Touch Gestures & Navigation (320x240)

* **Top-Right "APPS" Button (X > 270, Y < 32):** Instantly opens the **RX-78-2 Mobile Suit Cores App Drawer** (3x2 grid of cards).
* **Bottom Android Gesture Pill (Y > 215, X 100-220):** Returns immediately to the **Gargantua Singularity Core Home**.
* **Singularity Core Tap:** Touching the black hole triggers a radiant relativistic plasma flare across the accretion disk.
* **App Drawer Cards:** Tap any of the 6 mecha cards in the 3x2 grid to launch:
  - `OPT-01`: Tactical Optics & Camera Feed
  - `COM-02`: Voice Operator (I2S PDM Mic)
  - `DAT-03`: AI Neural Chat Comms
  - `NAV-04`: Spatial PPI Radar Scope
  - `TLM-05`: Hardware Diagnostics & Telemetry
  - `CFG-06`: Settings & Node Status
