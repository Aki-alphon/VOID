# PROJECT VOID OS // NEURAL OPERATOR & CYBER-PHYSICAL EDGE AI

<div align="center">

```
 __      __ _____  _____  _____    ____    _____ 
 \ \    / // __  \|_   _||  __ \  / __ \  / ____|
  \ \  / /| |  | |  | |  | |  | || |  | || (___  
   \ \/ / | |  | |  | |  | |  | || |  | | \___ \ 
    \  /  | |__| | _| |_ | |__| || |__| | ____) |
     \/    \____/ |_____||_____/  \____/ |_____/ 
                                                 
   V I S I O N   O P T I C S   &   I N T E G R A T E D   D I A G N O S T I C S
```

**An autonomous, multi-tier Edge-Hub-Cloud Cyber-Physical AI Companion & Neural Operator HUD.**  
*Bridging bare-metal ESP32-S3 edge avatar hardware, on-device mobile neural intelligence, and a relativistic Kerr black hole operator console.*

[![Platform](https://img.shields.io/badge/Platform-ESP32--S3%20%7C%20FreeRTOS-red.svg?style=for-the-badge&logo=espressif)](https://www.espressif.com/)
[![Firmware](https://img.shields.io/badge/Firmware-PlatformIO%20%7C%20C%2B%2B17-blue.svg?style=for-the-badge&logo=platformio)](https://platformio.org/)
[![Operator HUD](https://img.shields.io/badge/Console-Three.js%20%7C%20WebGL%20%7C%20GLSL-orange.svg?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![Mobile Brain](https://img.shields.io/badge/Mobile-React%20Native%200.82%20%7C%20LLaMA.cpp-61DAFB.svg?style=for-the-badge&logo=react)](https://reactnative.dev/)
[![Design](https://img.shields.io/badge/Design-Dot--Matrix%20%7C%20Sci--Fi%20Mecha-E0DCD0.svg?style=for-the-badge)](#-design-language--aesthetic-system)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

</div>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [System Architecture (Edge-Hub-Cloud)](#-system-architecture)
- [Key Features](#-key-features)
- [Subsystems Deep Dive](#-subsystems-deep-dive)
  - [1. VOID OS Firmware (Far-Edge Hardware Avatar)](#1-void-os-firmware-xiao-esp32-s3-sense)
  - [2. Neural Operator HUD (Web Console & WebGL Engine)](#2-neural-operator-hud-web-dashboard)
  - [3. Mobile Gateway (Near-Edge Neural Hub)](#3-mobile-gateway-on-device-private-ai)
- [Hardware Bill of Materials & Wiring Guide](#-hardware-specifications--wiring-guide)
- [Getting Started & Installation](#-getting-started--installation)
  - [Flashing the ESP32-S3 Firmware](#1-flashing-the-firmware)
  - [Launching the Operator HUD Dashboard](#2-launching-the-web-operator-hud)
  - [Building the Mobile Gateway App](#3-building-the-mobile-app)
- [Interactive Control & API Reference](#-interactive-control--api-reference)
  - [Serial Command Interface](#serial-cli-commands-115200-baud)
  - [REST API Endpoints](#http-rest-api-endpoints-port-80)
  - [Resistive Touch Gestures](#touch-navigation-gestures-320x240-landscape)
- [Design Language & Aesthetic System](#-design-language--aesthetic-system)
- [Repository Directory Tree](#-repository-structure)
- [Roadmap](#-roadmap)
- [License](#-license)

---

## 🌌 Overview

**Project VOID OS** is a cyber-physical AI companion and telemetry operating system. Traditional AI assistants are locked inside cloud siloes and flat chat boxes. VOID breaks AI into the physical universe through a tri-layered architecture:

1. **Far-Edge Physical Avatar (ROVE Node):** Built on the **Seeed Studio XIAO ESP32-S3 Sense** microcontroller driving a **SmartElex 2.8" SPI TFT (ILI9341)** and **XPT2046 touch controller**, featuring a real-time DVP camera pipeline (OV2640/OV3660) and 16kHz I2S PDM microphone.
2. **Near-Edge Neural Hub (Android/iOS Gateway):** An on-device mobile AI runtime powered by **React Native**, **LLaMA.cpp (`llama.rn`)**, **ONNX Runtime**, and local neural TTS. Operates with an OpenClaw-inspired **Heartbeat Engine**, **Markdown Memory Store** (`SOUL.md`, `MEMORY.md`), and **Ghost Finger** intent automation.
3. **Cinematic Neural Operator HUD (WebGL Console):** A zero-dependency Node.js console rendering a ray-traced **Kerr metric relativistic black hole accretion disk** (`ghostty_blackhole.glsl` & Three.js), high-frequency bi-directional WebSockets, 16-band audio spectrum analyzer, and **HKO-Type PPI CRT radar** with WiFi RF proximity sensing.

Designed with the minimalist dot-matrix typography of **Nothing OS** (`Ndot-57`, `NType-82`), raw `#F800` Nothing Red, and iconic **Gundam RX-78-2** mobile suit livery (`#7A96B2`, `#E5A21E`, `#C86676`).

---

## 🏗️ System Architecture

Project VOID utilizes an asynchronous **Edge-Hub-Cloud Topology** designed to preserve battery, maintain local-first privacy, and provide instantaneous physical feedback:

```mermaid
graph TD
    subgraph FarEdge ["Far-Edge (Physical Avatar // XIAO ESP32-S3 Sense)"]
        Sensors["OV2640 Camera // I2S PDM Mic // TinyML VAD"] --> ESP["ESP32-S3 Dual LX7 @ 240MHz"]
        ESP --> Actuators["SmartElex 2.8' TFT (ILI9341) // XPT2046 Touch"]
        ESP --> NetNode["REST API (:80) & WebSockets (:81)"]
    end

    subgraph NearEdge ["Near-Edge Hub (Mobile Gateway // OpenClaw Architecture)"]
        WSClient["WebSocket Client"] <--> NetNode
        HB["Heartbeat Engine (WorkManager)"] --> Router["LLM Router & Tool Dispatcher"]
        Mem[("Markdown Memory Store\nSOUL.md & MEMORY.md")] <--> Router
        WSClient --> Router
        Router --> GF["Ghost Finger (Android Intents & Accessibility API)"]
    end

    subgraph InferenceEngine ["Inference Engine (Local GGUF / Cloud LLM)"]
        Router <--> LocalLLM["On-Device LLaMA.cpp (Gemma / Qwen / Phi)"]
        Router <--> CloudAPI["Groq / Gemini / Ollama Cloud APIs"]
    end

    subgraph OperatorConsole ["Operator Console (Web HUD // Three.js & GLSL)"]
        Browser["WebGL HUD (singularity.js & app.js)"] <-->|LAN WebSockets| NetNode
        Browser --> PPI["HKO-Type PPI Radar (WiFi RF Kalman Tracker)"]
    end

    GF --> Apps["System Actions (WhatsApp / Calendar / Camera Snapshots)"]
```

### ⚡ Data Flow Example: "Urgent Intercept & Physical Warning"
1. **Event Capture:** An incoming notification or wake-word interrupt triggers on either the mobile hub or the XIAO board.
2. **Context Assembly:** The Mobile Gateway ingests the event, attaches persona rules from `SOUL.md`, factual history from `MEMORY.md`, and any fresh camera frame.
3. **Structured Tool Calling:** The LLM evaluates urgency in strict JSON format: `{"urgent": true, "action": "alert_user", "label": "SECURITY HAZARD"}`.
4. **Physical Dispatch:** The Gateway pushes `POST /api/alert?title=SECURITY&msg=HAZARD` across the local network to the XIAO avatar.
5. **Physical Reaction:** The ILI9341 display turns vivid mecha red, triggers an acoustic alert tone, and updates the telemetry stream across all connected Web HUD consoles.

---

## ✨ Key Features

- **🔴 7 Bare-Metal Embedded OS Modes:** Complete FreeRTOS-driven user experience on the 2.8" SPI TFT, from Gargantua core telemetry to tactical camera viewfinders and radar scopes.
- **🕳️ Binet Schwarzschild Kerr Accretion Simulation:** High-accuracy relativistic black hole physics. Includes an authentic 788-point precomputed geodesic dot-matrix on the micro-display and full GLSL fragment ray-tracing in the web console.
- **📷 Zero-Latency Direct DVP Optics Pipeline:** RGB565 frames captured straight from the OV2640/OV3660 sensor into Octal PSRAM and blasted to the ILI9341 display with hardware-swapped endianness.
- **🎙️ Real-Time 16kHz I2S Voice Scope:** Onboard PDM digital microphone streaming raw PCM audio buffers to an interactive 16-band equalizer with peak-hold dots and oscilloscope waveforms.
- **📡 WiFi RF Proximity Radar (HKO-Type PPI):** Computes physical operator distance in meters using a log-distance path loss radio model ($n=2.4$) with real-time Kalman smoothing.
- **🧠 100% Private On-Device LLM Hub:** React Native mobile gateway running GGUF models offline with hardware acceleration (Qualcomm Hexagon NPU, Adreno OpenCL, Apple Metal).
- **🕹️ Dual Control Stack:** Control via hardware resistive touch gestures, serial terminal CLI (115200 baud), or HTTP REST API endpoints.
- **🎨 Mecha Cyberpunk Aesthetic:** Custom Nothing OS dot-matrix iconography combined with authentic Gundam RX-78-2 Mobile Suit panel-line details and tri-bar livery.

---

## 🔬 Subsystems Deep Dive

### 1. VOID OS Firmware (XIAO ESP32-S3 Sense)

The embedded firmware runs directly on the ESP32-S3 dual-core microcontroller (240 MHz, 8MB PSRAM, 8MB Flash) utilizing FreeRTOS tasks to multiplex display rendering, WiFi communication, and sensor acquisition.

#### Display Modes (`enum OSMode` in [`config.h`](file:///include/config.h))

| Mode ID | Enum Constant | Operational Screen Name | Core Visuals & Capabilities |
| :---: | :--- | :--- | :--- |
| **0** | `MODE_SINGULARITY_HUD` | `// CORE HUD` | 36.5° tilted Gargantua Singularity, 32-particle vector orbital disk, live jittering telemetry flanks (`LAT`, `AZ`, `MASS`, `SPIN`), touch relativistic plasma flare. |
| **1** | `MODE_APP_DRAWER` | `// MOBILE SUIT CORES` | RX-78-2 6-card mecha interactive launcher grid with Gundam tri-bar livery (`OPT-01`, `COM-02`, `DAT-03`, `NAV-04`, `TLM-05`, `CFG-06`). |
| **2** | `MODE_TACTICAL_OPTICS` | `// OPTICS (CAM)` | Direct DVP raw camera viewfinder with tactical reticle brackets, center target crosshair, and `REC // 30.0 FPS` indicator. |
| **3** | `MODE_VOICE_COMMS` | `// VOICE SCOPE` | 16-band audio equalizer with floating peak-hold indicators, real-time 16kHz PCM oscilloscope trace, and microphone dB level monitor. |
| **4** | `MODE_AI_MESSAGES` | `// AI MESSAGES` | Tactical neural communication terminal logs, system prompt parameters, and operator prompt line. |
| **5** | `MODE_SPATIAL_RADAR` | `// SPATIAL RADAR` | HKO-Type Plan Position Indicator (PPI) phosphor CRT radar sweep with WiFi RF proximity calculations and target rings. |
| **6** | `MODE_SYSTEM_METRICS` | `// METRICS (SYS)` | Dual percentage gauges for internal SRAM (Heap) and external Octal PSRAM (8MB), WiFi RSSI dBm signal bar, IP address, and bus health indicators. |

---

### 2. Neural Operator HUD (Web Dashboard)

Located in [`dashboard/`](file:///dashboard/), this zero-dependency web interface serves as an advanced operator console accessible from any desktop or mobile browser on the local network.

- **WebGL Black Hole Engine ([`singularity.js`](file:///dashboard/singularity.js)):** Uses Three.js and custom GLSL fragment shaders derived from Binet photon acceleration formulas:
  $$a = -\frac{3}{2} \frac{h^2 \mathbf{x}}{r^5}$$
  Accurately reproduces the gravitational shadow ($b_{\text{crit}} = \frac{3\sqrt{3}}{2} r_s$), relativistic Doppler beaming, and asymmetric Keplerian accretion disk luminance.
- **RF Proximity Localizer:** Tracks operator presence using 2.4GHz WiFi RSSI variations smoothed with a 1D Kalman filter to display distance in meters on a vintage CRT phosphor scope.
- **Tactical Modals:** Includes live camera MJPEG streams, I2S voice visualizers, neural terminal chat, security lock matrix, and file storage vault.
- **Zero-Dependency Server ([`server.js`](file:///dashboard/server.js)):** Native Node.js HTTP implementation with automated local network IP discovery and MIME handling.

---

### 3. Mobile Gateway (On-Device Private AI)

Located in [`app/void/`](file:///app/void/), the mobile application acts as the "Near-Edge Brain" of the system:

- **Local Inference:** Built on React Native 0.82 with `llama.rn`, running quantized GGUF models (Gemma, Qwen, Phi-3, LLaMA) with zero cloud dependency.
- **Heartbeat Engine:** Uses Android `WorkManager` and Kotlin coroutines to execute scheduled cognitive jobs from `HEARTBEAT.md` without battery drain.
- **Dynamic Memory System:** Reads `SOUL.md` (persona/instructions) and `MEMORY.md` (append-only user fact store) before each reasoning loop.
- **Ghost Finger Executor:** Directs actions using implicit Android Intents and the Accessibility API to control apps (e.g., WhatsApp, calendar, navigation) based on tool calls returned by the LLM.

---

## 🔌 Hardware Specifications & Wiring Guide

### Component Bill of Materials (BOM)

| Component | Model / Spec | Interface | Role |
| :--- | :--- | :--- | :--- |
| **Microcontroller** | Seeed Studio XIAO ESP32-S3 Sense | Dual-core 240MHz, 8MB PSRAM, 8MB Flash | Far-Edge Avatar Processor |
| **Display Header** | SmartElex 2.8" SPI TFT (ILI9341 320x240) | Hardware SPI (HSPI / SPI3 @ 4 MHz) | Primary OS Visual HUD |
| **Touch Controller**| XPT2046 Resistive Touch Controller | Hardware SPI (Dedicated CS/MISO) | Touch Input / Gesture Surface |
| **Vision Sensor** | OV2640 / OV3660 Camera Sensor | DVP 8-bit Parallel via B2B Header | Real-Time Video Capture |
| **Audio Sensor** | MEMS PDM Digital Microphone | I2S PDM (GPIO 41 CLK, GPIO 42 DATA) | Voice & Acoustic Telemetry |

---

### Display Pinout (SmartElex 2.8" ILI9341 SPI)

Connect the display header to the XIAO ESP32-S3 headers using female-to-female jumper wires:

| Display Pin | XIAO ESP32-S3 Pin | GPIO | Function & Engineering Notes |
| :--- | :--- | :--- | :--- |
| **VCC** | **5V** | 5V | Powers the display's onboard 3.3V LDO regulator. |
| **GND** | **GND** | GND | Common ground rail. |
| **CS** | **D3** | GPIO 4 | Display SPI Chip Select. |
| **RESET** | **D1** | GPIO 2 | Hardware Reset line (firmware controlled). |
| **DC** | **D6** | GPIO 43 | Data / Command selector pin. |
| **SDI (MOSI)**| **D10** | GPIO 9 | Hardware SPI MOSI (Master Out Slave In). |
| **SCK** | **D8** | GPIO 7 | Hardware SPI Clock line. |
| **LED** | **3V3** | 3.3V | Backlight power rail. |
| **SDO (MISO)**| **DO NOT CONNECT** | — | **LEAVE DISCONNECTED!** Display is write-only. Connecting this alongside touch `T_DO` causes bus contention that can freeze the screen. |

---

### Touch Pinout (XPT2046 Touch Controller)

Connect the 5-pin `TOUCH` header on the display module:

| Touch Pin | XIAO ESP32-S3 Pin | GPIO | Function & Engineering Notes |
| :--- | :--- | :--- | :--- |
| **T_CLK** | **D8** (Shared) | GPIO 7 | Shares the SPI Clock line with the ILI9341 display. |
| **T_DIN** | **D10** (Shared)| GPIO 9 | Shares the SPI MOSI line with the ILI9341 display. |
| **T_DO** | **D9** | GPIO 8 | Dedicated Touch SPI MISO line. |
| **T_CS** | **D2** | GPIO 3 | Dedicated Touch Chip Select (Active LOW). |
| **T_IRQ** | **DO NOT CONNECT** | — | **LEAVE DISCONNECTED!** Firmware uses isolated 24-clock bitwise SPI pressure polling. Leaving `T_IRQ` disconnected eliminates signal crosstalk with the Reset line. |

---

## 🚀 Getting Started & Installation

### Prerequisites

Ensure you have the following installed on your host workstation:
- [PlatformIO Core (CLI)](https://docs.platformio.org/en/latest/core/installation/index.html) or [PlatformIO IDE for VS Code](https://platformio.org/install/ide?install=vscode)
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [Yarn](https://yarnpkg.com/) (v1.22+ for the mobile app)
- Android SDK & JDK 17 (if compiling the mobile app)

---

### 1. Flashing the Firmware

1. Connect the **XIAO ESP32-S3 Sense** to your computer using a USB-C data cable.
2. In the project root, run the automated flashing script:
   ```bash
   # On Linux / macOS
   chmod +x flash_xiao.sh
   ./flash_xiao.sh

   # Or manually via PlatformIO
   pio run -t upload
   ```
3. To monitor serial debug logs:
   ```bash
   pio device monitor -b 115200
   ```
> [!TIP]
> If the board fails to enter flashing mode automatically:
> 1. Hold down the **B** (Boot) button on the back of the XIAO.
> 2. Press the **R** (Reset) button once.
> 3. Release the **B** button.
> 4. Rerun `./flash_xiao.sh`.

---

### 2. Launching the Web Operator HUD

1. Open a terminal and navigate to the `dashboard` directory:
   ```bash
   cd dashboard
   ```
2. Start the zero-dependency Node server:
   ```bash
   npm start
   # or: node server.js
   ```
3. Open `http://localhost:5000` in your browser.  
   *(The server will also print your local LAN IP address, e.g., `http://192.168.x.x:5000`, so you can load the HUD onto your tablet or smartphone!)*

---

### 3. Building the Mobile App

1. Navigate to the mobile app folder:
   ```bash
   cd app/void
   ```
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Run on Android:
   ```bash
   yarn android
   ```
4. Run on iOS (macOS required):
   ```bash
   cd ios && pod install && cd ..
   yarn ios
   ```

---

## 🕹️ Interactive Control & API Reference

### Serial CLI Commands (115200 Baud)

Open the serial monitor (`pio device monitor`) and send text commands:

| Command | Action |
| :--- | :--- |
| `hud` or `0` | Switch display to **Singularity Core HUD**. |
| `drawer` or `1` | Open the **RX-78-2 Mobile Suit Cores App Drawer**. |
| `cam` or `2` | Switch to **Tactical Optics (Camera Viewfinder)**. |
| `audio` or `3` | Switch to **Voice Scope (I2S Microphone Spectrum)**. |
| `messages` or `4` | Open **AI Neural Comms Log**. |
| `radar` or `5` | Switch to **Spatial PPI CRT Radar Scope**. |
| `metrics` or `6` | Open **System Diagnostics & Telemetry**. |
| `next` | Cycle forward to the next display screen. |
| `demo` | Toggle autonomous cycling mode (rotates screens every 4s). |
| `alert <msg>` | Trigger a full-screen tactical warning overlay banner. |
| `touch on` / `touch off` | Enable or disable physical SPI touch polling. |
| `tap flare` | Trigger a relativistic plasma energy flare on the accretion disk. |
| `tap apps` | Virtual touch tap on the top-right APPS launcher. |
| `tap home` | Virtual touch tap on the bottom gesture pill. |

---

### HTTP REST API Endpoints (Port 80)

When connected to your local Wi-Fi network (or the XIAO fallback SoftAP `VOID-OS-NODE`), the avatar exposes a REST API:

```http
# Check current system status and telemetry
GET http://<xiao-ip>/api/status
Response:
{
  "status": "ONLINE",
  "mode": 0,
  "heap_free": 268420,
  "psram_free": 7820140,
  "uptime": 128
}

# Switch display mode (0 to 6)
POST http://<xiao-ip>/api/mode?mode=2
Response: OK

# Trigger tactical alert modal
POST http://<xiao-ip>/api/alert?title=URGENT&msg=Intruder+Detected
Response: ALERT_ENGAGED

# Toggle display color inversion
GET http://<xiao-ip>/api/invert
Response: INVERT_TOGGLED
```

---

### Touch Navigation Gestures (320x240 Landscape)

```
+-------------------------------------------------------+
| [09:41]   // CORE HUD          [WIFI] [BAT]   [APPS]  | <- Top Bar (Tap APPS for Drawer)
|                                                       |
|                     ( * )                             |
|               SINGULARITY CORE                        | <- Tap Core: Relativistic Flare
|                                                       |
|                      ---                              |
+-------------------------------------------------------+
|                   [ ====== ]                          | <- Bottom Gesture Pill (Tap for Home)
+-------------------------------------------------------+
```

- **Top-Right `APPS` Button ($X \ge 270, Y \le 32$):** Opens the 6-card mecha application drawer.
- **Bottom Gesture Navigation Pill ($Y \ge 215, 100 \le X \le 220$):** Returns home to the Singularity Core from any operational mode.
- **Singularity Core Tap:** Interacting with the event horizon unleashes a radiant plasma flare across the accretion disk.
- **App Drawer Cards (3x2 Grid):** Tapping cards 1 through 6 launches the corresponding tactical subsystem.

---

## 🎨 Design Language & Aesthetic System

Project VOID fuses the raw industrial functionalism of **Nothing OS** with the military mecha architecture of **Mobile Suit Gundam RX-78-2**:

### Palette Matrix

```
[#0C0B0A] COLOR_NT_VOID        - Dark Warm Space Void
[#1C1A16] COLOR_NT_CHARCOAL    - Carbon Armor Panel Background
[#E0DCD0] COLOR_NT_WHITE       - Gundam Armor Bone-White
[#F82030] COLOR_NT_RED_VIVID   - Nothing Red Signature Glyph
[#C89018] COLOR_NT_AMBER       - RX-78-2 Collar Amber Mustard
[#7A96B2] COLOR_GUNDAM_BLUE    - RX-78-2 Torso Armor Steel Blue
[#36D6A8] COLOR_NT_MINT        - Tactical Optics Lens Mint Green
[#00CC44] COLOR_NT_GREEN       - T.A.R.S. Mono-Eye Phosphor Green
```

- **Dot-Matrix Typography:** Uses `Ndot-57` and `NType-82` for status readouts, battery pills, and telemetry readouts.
- **Blueprint Chamfers:** Tactical dialog frames feature mecha corner cutouts, panel-line rivet accents, and Gundam tri-bars (`Blue`, `Yellow`, `Red`).

---

## 📁 Repository Structure

```
VOID-main/
├── platformio.ini              # PlatformIO build configuration for XIAO ESP32-S3
├── flash_xiao.sh               # Automated bash firmware compilation & flash script
├── ghostty_blackhole.glsl      # Reference Binet Kerr null geodesic fragment shader
│
├── src/                        # Embedded C++ Firmware Source
│   ├── main.cpp                # FreeRTOS setup, loop, serial CLI & touch routing
│   └── display_hud.cpp         # 7-mode ILI9341 Nothing OS rendering engine
│
├── include/                    # Firmware Header Files
│   ├── config.h                # Pin mappings, Gundam color palette & screen modes
│   ├── display_hud.h           # DisplayHUD class declaration & animation states
│   ├── camera_module.h         # Direct DVP RGB565 OV2640 camera driver
│   ├── network_module.h        # WiFi STA/AP, REST API (:80) & WebSocket handler
│   ├── touch_module.h          # Isolated XPT2046 SPI pressure engine
│   └── singularity_dots.h      # 788-point precomputed relativistic geodesic dots
│
├── dashboard/                  # Sci-Fi Neural Operator Web Console
│   ├── index.html              # Main operator HUD layout, status bar & modals
│   ├── style.css               # Nothing OS & Gundam mecha styling rules
│   ├── app.js                  # HUD UI controller, event hooks & modal management
│   ├── esp32_client.js         # WebSocket telemetry & binary PCM audio receiver
│   ├── singularity.js          # Three.js WebGL relativistic black hole engine
│   ├── server.js               # Zero-dependency Node.js LAN server
│   └── *.otf / *.ttf           # Ndot-57 & NType-82 font assets
│
├── app/                        # Mobile Neural Gateway Hub
│   └── void/                   # React Native on-device offline LLM app
│       ├── package.json        # Dependencies (llama.rn, onnxruntime, speech)
│       └── src/                # Mobile LLM engine, memory store & tools
│
└── guide/                      # Architectural & Engineering Documentation
    ├── HLD_LLD_Architecture.md # Complete Edge-Hub-Cloud system design
    ├── specifications.md       # XIAO ESP32-S3 Sense datasheet & electrical specs
    ├── VOID_OS_XIAO_MANUAL.md  # Embedded firmware operations manual
    └── display_wiring_guide.md # Step-by-step display & touch wiring diagram
```

---

## 🗺️ Roadmap

- [x] Bare-metal FreeRTOS operating system on Seeed Studio XIAO ESP32-S3.
- [x] SmartElex 2.8" SPI TFT (ILI9341) + XPT2046 resistive touch controller integration.
- [x] Precomputed 788-point Binet Schwarzschild geodesic singularity simulation.
- [x] Zero-latency RGB565 OV2640 direct DVP camera pipeline.
- [x] WebGL Three.js operator console with real-time WebSocket telemetry.
- [x] WiFi RF proximity radar with 1D Kalman distance estimation.
- [x] On-device offline LLM mobile gateway hub with OpenClaw memory & heartbeat scheduling.
- [ ] 3D-printable mecha desktop enclosure with active servo gimbal for the avatar eye.
- [ ] Direct offline WakeNet wake-word model running via ESP-SR on Core 1.
- [ ] Stereo visual odometry and autonomous navigation via ROS2 micro-node bridging.

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

### Acknowledgments
- Built with open-source tools: PlatformIO, FreeRTOS, Adafruit GFX, ArduinoJson, Three.js, and React Native.
- Inspired by retro-futuristic mecha aesthetics, minimalist dot-matrix interface design, and computational general relativity research.

---

<div align="center">
  <sub>PROJECT VOID OS // BUILT FOR AUTONOMOUS EXPLORATION AND EDGE INTELLIGENCE</sub>
</div>
