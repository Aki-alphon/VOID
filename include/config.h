#pragma once
#include <Arduino.h>

// ==============================================================================
// 1. PIN DEFINITIONS (XIAO ESP32-S3 SENSE + DISPLAY + TOUCH)
// ==============================================================================
// Display (ILI9341 SPI - Hardware verified)
#define TFT_CS    4   // D3 (GPIO 4)
#define TFT_DC    43  // D6 (GPIO 43)
#define TFT_RST   2   // D1 (GPIO 2)
#define TFT_MOSI  9   // D10 (GPIO 9)
#define TFT_SCLK  7   // D8 (GPIO 7)
#define TFT_MISO  8   // D9 (GPIO 8)

// Touch Controller (XPT2046 SPI - Hardware verified)
#define TOUCH_CS   3   // D2 (GPIO 3 - Dedicated Touch Chip Select)
#define TOUCH_IRQ  1   // D0 (GPIO 1 - Dedicated Touch Interrupt)

// Touch Screen Calibration (2.8" Resistive Touch)
#define TS_MINX 240
#define TS_MAXX 3750
#define TS_MINY 280
#define TS_MAXY 3800

// Camera (XIAO ESP32-S3 Sense B2B Header)
#define CAM_PWDN_GPIO_NUM     -1
#define CAM_RESET_GPIO_NUM    -1
#define CAM_XCLK_GPIO_NUM     10
#define CAM_SIOD_GPIO_NUM     40
#define CAM_SIOC_GPIO_NUM     39
#define CAM_Y9_GPIO_NUM       48
#define CAM_Y8_GPIO_NUM       11
#define CAM_Y7_GPIO_NUM       12
#define CAM_Y6_GPIO_NUM       14
#define CAM_Y5_GPIO_NUM       16
#define CAM_Y4_GPIO_NUM       18
#define CAM_Y3_GPIO_NUM       17
#define CAM_Y2_GPIO_NUM       15
#define CAM_VSYNC_GPIO_NUM    38
#define CAM_HREF_GPIO_NUM     47
#define CAM_PCLK_GPIO_NUM     13

// ==============================================================================
// 2. GUNDAM RX-78-2 & NOTHING OS COLOR PALETTE (From dashboard/style.css)
// ==============================================================================
// Backgrounds
#define COLOR_NT_VOID         0x0841  // #0C0B0A Dark Warm Void
#define COLOR_NT_CHARCOAL     0x18C3  // #1C1A16 Dark Panel Background
#define COLOR_NT_CARD_BG      0x10A2  // #131210 Dark Card Surface

// Borders & Shadows
#define COLOR_NT_BORDER       0x4A48  // #4A4840 Panel-line ink
#define COLOR_NT_BORDER_ACT   0xCC83  // #C89018 Active Amber Border

// Typography Colors
#define COLOR_NT_WHITE        0xEF5A  // #E0DCD0 Off-White Armor Panel
#define COLOR_NT_SILVER       0x8CD5  // #8A9AAA Steel Blue-Grey Tint
#define COLOR_NT_MUTED        0x4208  // #4A4840 Muted Shadow Panel Line

// Mecha Accents
#define COLOR_NT_AMBER        0xCC83  // #C89018 Primary Amber Mustard (Gundam Collar)
#define COLOR_NT_AMBER_HOT    0xDD04  // #DCA020 Hot Amber Core
#define COLOR_NT_COPPER       0x9A44  // #9C4818 Burnt Copper / Relativistic Receding Disk
#define COLOR_NT_RUST         0x61C2  // #602010 Deep Rust Shadow
#define COLOR_NT_RED_VIVID    0xF904  // #F82030 Vivid Nothing Red Glyph Arc
#define COLOR_NT_BLUE_COBALT  0x1A7E  // #1850FA Vivid Cobalt Blue Glyph Arc
#define COLOR_NT_YELLOW_WARM  0xFE03  // #FCE018 Warm Golden Yellow Glyph Arc
#define COLOR_NT_STEEL        0x8D17  // #8BA0B8 Torso / Shoulder Steel Blue
#define COLOR_NT_CRIMSON      0xB2CD  // #B05868 Dusty Rose / Knee Armor
#define COLOR_NT_GREEN        0x0668  // #00CC44 T.A.R.S. Mono-Eye Acid Green
#define COLOR_NT_MINT         0x36B5  // #36D6A8 Optics Lens Mint Green

// Gundam Tri-Bar Colors
#define COLOR_GUNDAM_BLUE     0x7CB6  // #7A96B2
#define COLOR_GUNDAM_YELLOW   0xE503  // #E5A21E
#define COLOR_GUNDAM_RED      0xC32E  // #C86676

// Legacy Compatibility Aliases
#define COLOR_BG              COLOR_NT_VOID
#define COLOR_PANEL_BG        COLOR_NT_CHARCOAL
#define COLOR_TEXT_WHITE      COLOR_NT_WHITE
#define COLOR_TEXT_BONE       0xCE79
#define COLOR_TEXT_DIM        COLOR_NT_BORDER
#define COLOR_NOTHING_RED     0xF800
#define COLOR_CYAN            0x07FF
#define COLOR_GREEN           COLOR_NT_GREEN
#define COLOR_ORANGE          COLOR_NT_AMBER

// ==============================================================================
// 3. OPERATING SYSTEM SCREEN MODES (Matching website architecture)
// ==============================================================================
enum OSMode {
  MODE_SINGULARITY_HUD = 0, // Hero Gargantua Singularity Core with 36.5° tilt & Telemetry
  MODE_APP_DRAWER      = 1, // RX-78-2 Mobile Suit Cores 6-Card Hub (Gundam Tri-bar)
  MODE_TACTICAL_OPTICS = 2, // OPT-01 Optics Feed (Sense Camera Stream & Crosshairs)
  MODE_VOICE_COMMS     = 3, // COM-02 Voice Comms (I2S PDM Mic Pulse & 16kHz Equalizer)
  MODE_AI_MESSAGES     = 4, // DAT-03 AI Messages (Tactical Neural Log & CMD prompt)
  MODE_SPATIAL_RADAR   = 5, // NAV-04 Spatial Radar (HKO-Type PPI CRT Scope & Proximity)
  MODE_SYSTEM_METRICS  = 6, // TLM-05 Telemetry (Realtime Heap, PSRAM, CPU Gauges)
  MODE_COUNT           = 7
};
