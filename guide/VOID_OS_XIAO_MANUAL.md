# PROJECT VOID OS // XIAO ESP32-S3 SENSE FIRMWARE MANUAL

This manual explains how the **Project VOID Web Operator HUD** has been ported into a bare-metal C++ FreeRTOS operating system running directly on the **Seeed Studio XIAO ESP32-S3 Sense** and driving the **SmartElex 2.8" SPI TFT (ILI9341 320x240)** display.

---

## 1. System Overview

| Subsystem | Specification | Description |
| :--- | :--- | :--- |
| **SoC** | ESP32-S3R8 | Dual-Core Xtensa LX7 @ 240MHz, 8MB Octal PSRAM, 8MB Flash |
| **Display** | SmartElex 2.8" TFT | 320x240 Landscape, Hardware SPI (ILI9341) |
| **Vision** | Sense OV2640 / OV3660 | Raw RGB565 DVP Direct Pipeline (zero JPEG latency) |
| **Audio** | PDM Digital Microphone | GPIO 41 (CLK) & GPIO 42 (DATA) 16kHz sampling |
| **Wireless** | WiFi Station + AP | Auto-connects to `AJAY`, falls back to AP `VOID-OS-NODE` |
| **Aesthetic** | Nothing OS / Cyberpunk | Dot-matrix layout, `#F800` Nothing Red, Bone White `#CE79` |

---

## 2. Display Pin Connections (from [display_wiring_guide.md](file:///home/aki/Downloads/XIAO/guide/display_wiring_guide.md))

Connect your display header to the top headers of the XIAO ESP32S3 using female-to-female jumpers:

+--------------------+------------------------+-------------------------------+
| Display Pin        | XIAO ESP32S3 Header    | Function                      |
+--------------------+------------------------+-------------------------------+
| VCC                | 5V                     | 5V Power (Drives onboard 3.3V LDO regulator)   |
| GND                | GND                    | Common Ground                 |
| CS                 | D3  (GPIO 4)           | SPI Chip Select               |
| RESET              | D1  (GPIO 2)           | Hardware Reset                |
| DC                 | D6  (GPIO 43)          | Data / Command                |
| SDI (MOSI)         | D10 (GPIO 9)           | Hardware SPI MOSI             |
| SCK                | D8  (GPIO 7)           | Hardware SPI Clock            |
| LED                | 3V3                    | Backlight Power               |
| SDO (MISO)         | LEAVE DISCONNECTED     | Unplugged (Write-only display) |
+--------------------+------------------------+-------------------------------+

### Touch Pin Connections (XPT2046 Controller)

```
+--------------------+------------------------+-------------------------------+
| Touch Pin          | XIAO ESP32S3 Header    | Function                      |
+--------------------+------------------------+-------------------------------+
| T_CLK              | D8  (Shared)           | Touch SPI Clock (Shares SCK)  |
| T_DIN              | D10 (Shared)           | Touch Data In (Shares MOSI)   |
| T_DO               | D9  (Shared)           | Touch Data Out (Shares MISO)  |
| T_CS               | D2  (GPIO 3)           | Touch Chip Select             |
| T_IRQ              | D0  (GPIO 1)           | Touch Interrupt (Active LOW)  |
+--------------------+------------------------+-------------------------------+
```

---

## 3. Four Core Embedded OS Screens

The OS features 4 real-time operational screens topped by a persistent **Nothing OS Status Bar** (Clock, Active Mode Badge, WiFi Status, Battery Pill):

### Mode 0: `// CORE HUD` (Singularity Core & Telemetry)
* **Vector Accretion Disk:** 32-particle rotating orbital field simulating the black hole event horizon from the web dashboard.
* **Telemetry Flanks:** Real-time jittering coordinate monitors (`LAT: 3.308`, `AZ: 19.478`, `MASS: 15.368`, `SPIN: 3.280`).
* **Dynamic Bar Gauges:** Vertical flank progress bars pulsating with system activity.
* **Kernel Capsule:** Live Free Heap SRAM monitor and status pill.

### Mode 1: `// OPTICS (CAM)` (Tactical Camera Viewfinder)
* **Direct RGB565 Stream:** Camera buffer dumps straight to ILI9341 via hardware SPI at high framerates.
* **Color Correction:** Automatic byte swapping fixes the ILI9341 "Predator vision / inverted thermal" artifact.
* **Tactical HUD Overlay:** Corner reticle brackets, center target crosshair, and `REC // 30.0 FPS` tag.

### Mode 2: `// VOICE SCOPE` (Audio Spectrum & Waveform)
* **16-Band Equalizer:** Green/Cyan/Red vertical equalizer bars with floating peak-hold dots driven by the PDM mic.
* **Oscilloscope Waveform:** Real-time 16kHz PCM audio waveform trace across the center scope.
* **Wake-word Status:** Audio energy decibel readout and WakeNet listener indicator.

### Mode 3: `// METRICS (SYS)` (System Diagnostics)
* **Memory Diagnostics:** Dual percentage bar gauges for Internal SRAM (Heap) and External Octal PSRAM (8MB).
* **Wireless Diagnostics:** IP Address, MAC Address, RSSI dBm signal strength.
* **Bus Health:** OV2640 camera status, I2S microphone status, Uptime counter.

---

## 4. Interactive Control & API

### Serial Terminal Controls (115200 Baud)
Open your serial monitor (`pio device monitor`) and type commands:
* `hud` or `0` &rarr; Switch to Singularity Core HUD
* `cam` or `1` &rarr; Switch to Tactical Optics Viewfinder
* `audio` or `2` &rarr; Switch to Voice Scope
* `metrics` or `3` &rarr; Switch to System Diagnostics
* `next` &rarr; Cycle to next screen
* `alert <message>` &rarr; Trigger a tactical alert modal overlay banner

### HTTP REST API (Port 80)
Any device on your WiFi (or connected to XIAO's AP `VOID-OS-NODE`) can send commands:
* `GET /api/status` &rarr; Returns JSON `{ "status": "ONLINE", "mode": 0, "heap_free": 268420, "uptime": 120 }`
* `POST /api/mode?mode=1` &rarr; Switches display mode
* `POST /api/alert?title=URGENT&msg=Boss+Calling` &rarr; Pops up full-screen pulsing tactical alert

---

## 5. How to Flash the XIAO ESP32S3

1. Connect the XIAO ESP32S3 to your PC using a USB-C data cable.
2. Run the automated flash script:
   ```bash
   cd /home/aki/Downloads/XIAO
   ./flash_xiao.sh
   ```
   *(Or using PlatformIO directly: `/home/aki/.local/bin/pio run -t upload`)*
3. If the board does not auto-enter flash mode:
   * Hold down the **B** (Boot) button.
   * Press the **R** (Reset) button once.
   * Release the **B** button.
   * Run `./flash_xiao.sh`.
