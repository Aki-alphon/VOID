#pragma once
#include <Arduino.h>
#include "esp_camera.h"
#include "config.h"

class CameraModule {
public:
  bool initialized = false;

  bool begin() {
    camera_config_t config;
    config.ledc_channel = LEDC_CHANNEL_0;
    config.ledc_timer   = LEDC_TIMER_0;
    config.pin_d0       = CAM_Y2_GPIO_NUM;
    config.pin_d1       = CAM_Y3_GPIO_NUM;
    config.pin_d2       = CAM_Y4_GPIO_NUM;
    config.pin_d3       = CAM_Y5_GPIO_NUM;
    config.pin_d4       = CAM_Y6_GPIO_NUM;
    config.pin_d5       = CAM_Y7_GPIO_NUM;
    config.pin_d6       = CAM_Y8_GPIO_NUM;
    config.pin_d7       = CAM_Y9_GPIO_NUM;
    config.pin_xclk     = CAM_XCLK_GPIO_NUM;
    config.pin_pclk     = CAM_PCLK_GPIO_NUM;
    config.pin_vsync    = CAM_VSYNC_GPIO_NUM;
    config.pin_href     = CAM_HREF_GPIO_NUM;
    config.pin_sccb_sda = CAM_SIOD_GPIO_NUM;
    config.pin_sccb_scl = CAM_SIOC_GPIO_NUM;
    config.pin_pwdn     = CAM_PWDN_GPIO_NUM;
    config.pin_reset    = CAM_RESET_GPIO_NUM;
    config.xclk_freq_hz = 20000000;
    config.frame_size   = FRAMESIZE_QVGA;     // 320x240 for 1:1 match with ILI9341
    config.pixel_format = PIXFORMAT_RGB565;    // Direct raw pixels for maximum frame rate
    config.grab_mode    = CAMERA_GRAB_LATEST;
    config.fb_location  = CAMERA_FB_IN_PSRAM;
    config.jpeg_quality = 12;
    config.fb_count     = 2;

    esp_err_t err = esp_camera_init(&config);
    initialized = (err == ESP_OK);
    if (initialized) {
      Serial.println(F("[Camera] OV2640 initialized (RGB565 320x240)"));
    } else {
      Serial.printf("[Camera] Init failed: 0x%x\n", err);
    }
    return initialized;
  }

  camera_fb_t* getFrame() {
    return initialized ? esp_camera_fb_get() : nullptr;
  }

  void returnFrame(camera_fb_t* fb) {
    if (fb) esp_camera_fb_return(fb);
  }
};
