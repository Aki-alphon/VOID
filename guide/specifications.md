# DATA SHEET: Seeed Studio XIAO ESP32S3 Sense

**Document Version:** 1.0  
**Product Category:** AIoT Microcontroller Unit (MCU) Module with Vision and Audio  
**Target Applications:** Edge Machine Learning, TinyML, Intelligent Voice Recognition, Embedded Vision, Smart Home Devices

---

## 1. General Description
The Seeed Studio XIAO ESP32S3 Sense is an ultra-small (21 x 17.5 mm) system-on-module (SoM) based on the Espressif ESP32-S3R8 SoC. It is engineered specifically for Artificial Intelligence of Things (AIoT) applications. The device integrates a high-performance dual-core XTensa LX7 processor with vector instructions for neural network acceleration, accompanied by 8MB of Octal SPI PSRAM and 8MB of Flash.

The "Sense" variant includes a dedicated plug-in expansion board via a Board-to-Board (B2B) connector, which provides a digital camera interface, a PDM digital microphone, and a MicroSD card slot, enabling immediate deployment of vision and audio machine learning models at the edge.

---

## 2. Key Features
*   **SoC:** Espressif ESP32-S3R8 (Dual-core 32-bit Xtensa LX7 @ up to 240 MHz)
*   **AI Acceleration:** Vector instructions for neural network computing (TensorFlow Lite for Microcontrollers, Edge Impulse).
*   **Wireless:** 2.4 GHz 802.11 b/g/n Wi-Fi, Bluetooth 5.0 (BLE), Bluetooth Mesh.
*   **Memory Architecture:** 8 MB PSRAM (Octal SPI) / 8 MB SPI Flash.
*   **Expansion (Sense Board):**
    *   Camera: Detachable OV3660 (or OV2640) sensor (up to QXGA 2048x1536 resolution).
    *   Audio: Built-in I2S PDM Digital Microphone.
    *   Storage: MicroSD card slot (supports FAT up to 32GB).
*   **Power Management:** Integrated battery charging IC (supports 3.7V Li-Po batteries).
*   **Interfaces:** 1x UART, 1x I2C, 1x I2S, 1x SPI, 11x GPIO (all PWM capable), 9x ADC.
*   **Form Factor:** Seeed XIAO Standard (21.0 mm × 17.5 mm).

---

## 3. Absolute Maximum Ratings
*Stresses beyond those listed under "Absolute Maximum Ratings" may cause permanent damage to the device. These are stress ratings only, and functional operation of the device at these or any other conditions beyond those indicated in the operational sections of the specifications is not implied.*

| Parameter | Symbol | Min | Max | Unit |
| :--- | :--- | :--- | :--- | :--- |
| **Supply Voltage (USB)** | V_IN (USB) | -0.3 | 5.5 | V |
| **Battery Voltage** | V_BAT | -0.3 | 4.2 | V |
| **I/O Pin Voltage** | V_IO | -0.3 | 3.6 | V |
| **Storage Temperature** | T_STG | -40 | 85 | °C |
| **Operating Temperature** | T_OP | -20 | 70 | °C |

---

## 4. Recommended Operating Conditions

| Parameter | Symbol | Min | Typ | Max | Unit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Operating Voltage (USB)** | V_IN | 4.75 | 5.0 | 5.25 | V |
| **Operating Voltage (Battery)**| V_BAT | 3.3 | 3.7 | 4.2 | V |
| **3.3V Output Voltage** | V_3V3 | 3.2 | 3.3 | 3.4 | V |
| **Operating Current (Wi-Fi Tx)**| I_TX | - | 260 | 350 | mA |
| **Operating Current (Deep Sleep)**| I_SLEEP | - | 14 | - | µA |
| **Battery Charge Current** | I_CHG | - | 50 | 100 | mA |

---

## 5. Subsystem Specifications

### 5.1 Wireless (Wi-Fi & Bluetooth)
*   **Wi-Fi Protocol:** 802.11 b/g/n (802.11n up to 150 Mbps)
*   **Wi-Fi Frequency:** 2412 ~ 2484 MHz
*   **Bluetooth Protocol:** Bluetooth v5.0 (BLE), Bluetooth Mesh
*   **Antenna:** External U.FL connector

### 5.2 Vision (Camera Module)
*   **Default Sensor:** OV3660 (or OV2640 depending on batch)
*   **Resolution:** 3 Megapixels (QXGA 2048 x 1536) for OV3660 / 2 Megapixels for OV2640.
*   **Output Formats:** RAW RGB, RGB565, YUV422, JPEG.
*   **Interface:** DVP (Digital Video Port) via B2B connector.
*   **FOV (Field of View):** 66° (Typical for standard lens).

### 5.3 Audio (Microphone)
*   **Type:** MEMS Digital Microphone
*   **Interface:** I2S (Inter-IC Sound) with PDM (Pulse Density Modulation)
*   **Frequency Response:** 100 Hz to 10 kHz (Optimized for voice frequency bands).
*   **Signal-to-Noise Ratio (SNR):** ~61 dB

---

## 6. Pinout and Interface Multiplexing
The XIAO ESP32S3 exposes 11 pads for standard external interfacing. Note that while the Sense expansion board uses internal GPIOs for the SD card and camera, the primary external headers remain available.

| Pad Name | ESP32-S3 GPIO | Primary Function | Secondary Functions |
| :--- | :--- | :--- | :--- |
| **D0** | GPIO 1 | ADC1_CH0 | PWM, Touch1 |
| **D1** | GPIO 2 | ADC1_CH1 | PWM, Touch2 |
| **D2** | GPIO 3 | ADC1_CH2 | PWM, Touch3 |
| **D3** | GPIO 4 | ADC1_CH3 | PWM, Touch4 |
| **D4** | GPIO 5 | ADC1_CH4 | I2C SDA, PWM |
| **D5** | GPIO 6 | ADC1_CH5 | I2C SCL, PWM |
| **D6** | GPIO 43 | UART TX | PWM |
| **D7** | GPIO 44 | UART RX | PWM |
| **D8** | GPIO 7 | SPI SCK | PWM |
| **D9** | GPIO 9 | SPI MISO | PWM |
| **D10** | GPIO 8 | SPI MOSI | PWM |

*(Note: Internal SD Card uses GPIO 21 for CS. Internal Camera uses GPIOs 10-18, 38-40, 47-48).*

---

## 7. Mechanical Specifications
*   **Dimensions:** 21.00 mm (L) × 17.50 mm (W) × ~5.50 mm (H with Sense board attached)
*   **Mounting:** Castellated pads for surface mount (SMT) or through-hole pins.
*   **Connector:** USB Type-C (Power and Data).

---
*End of Document*
