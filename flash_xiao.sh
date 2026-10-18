#!/usr/bin/env bash
# ==============================================================================
# PROJECT VOID OS // XIAO ESP32S3 FIRMWARE FLASHER SCRIPT
# ==============================================================================

set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
cd "$DIR"

echo "=== PROJECT VOID // XIAO ESP32S3 FLASHER ==="

# Check for PlatformIO
PIO_BIN="/home/aki/.local/bin/pio"
if [ ! -f "$PIO_BIN" ]; then
    PIO_BIN=$(which pio 2>/dev/null || which platformio 2>/dev/null)
fi

if [ -z "$PIO_BIN" ]; then
    echo "[-] Error: PlatformIO CLI not found."
    exit 1
fi

echo "[+] Using PlatformIO at: $PIO_BIN"

# Check connected serial ports
echo "[*] Scanning for connected XIAO ESP32S3 USB devices..."
PORTS=$(ls /dev/ttyACM* /dev/ttyUSB* 2>/dev/null || true)

if [ -z "$PORTS" ]; then
    echo "[!] No USB serial device detected (/dev/ttyACM* or /dev/ttyUSB*)."
    echo "[*] Please plug in the XIAO ESP32S3 via USB-C cable."
    echo "[*] (If entering bootloader mode: Hold the 'B' button, press 'R' reset, release 'B')."
    echo ""
    echo "[*] Compiling firmware binary ahead of time..."
    "$PIO_BIN" run
    echo "[+] Binary built successfully at: .pio/build/seeed_xiao_esp32s3/firmware.bin"
    echo "[*] Once plugged in, rerun: ./flash_xiao.sh"
    exit 0
fi

echo "[+] Detected device(s): $PORTS"
echo "[*] Uploading firmware to XIAO ESP32S3..."
"$PIO_BIN" run -t upload

echo "=== FLASH COMPLETE // PROJECT VOID OS RUNNING ==="
