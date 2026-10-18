#pragma once
#include <Arduino.h>
#include <WiFi.h>
#include <WebServer.h>
#include <ArduinoJson.h>
#include "config.h"

class NetworkModule {
public:
  WebServer server{80};
  bool connected = false;

  void begin(const char* ssid, const char* pass, const char* apSsid, const char* apPass, 
             std::function<void(JsonDocument&)> statusCallback,
             std::function<void(int)> modeCallback,
             std::function<void(const char*, const char*)> alertCallback,
             std::function<void()> invertCallback = nullptr) {
    WiFi.mode(WIFI_STA);
    WiFi.setTxPower(WIFI_POWER_2dBm); // Ultra-low transmit power to eliminate power rail dips
    WiFi.begin(ssid, pass);
    Serial.printf("[WiFi] Connecting to %s", ssid);

    unsigned long start = millis();
    while (WiFi.status() != WL_CONNECTED && millis() - start < 4500) {
      delay(250);
      Serial.print('.');
    }

    if (WiFi.status() == WL_CONNECTED) {
      connected = true;
      WiFi.setSleep(true); // Power-save radio when idle
      Serial.printf("\n[WiFi] Connected! IP: %s\n", WiFi.localIP().toString().c_str());
    } else {
      Serial.println(F("\n[WiFi] Station failed. Launching SoftAP..."));
      WiFi.softAP(apSsid, apPass);
      Serial.printf("[WiFi] SoftAP: %s (IP: %s)\n", apSsid, WiFi.softAPIP().toString().c_str());
    }

    // REST Endpoints
    server.on("/api/status", HTTP_GET, [this, statusCallback]() {
      JsonDocument doc;
      statusCallback(doc);
      String res;
      serializeJson(doc, res);
      server.send(200, "application/json", res);
    });

    server.on("/api/mode", HTTP_POST, [this, modeCallback]() {
      if (server.hasArg("mode")) {
        modeCallback(server.arg("mode").toInt());
        server.send(200, "text/plain", "OK");
      } else {
        server.send(400, "text/plain", "Missing mode");
      }
    });

    server.on("/api/invert", HTTP_GET, [this, invertCallback]() {
      if (invertCallback) invertCallback();
      server.send(200, "text/plain", "INVERT_TOGGLED");
    });

    server.on("/api/alert", HTTP_POST, [this, alertCallback]() {
      if (server.hasArg("title") && server.hasArg("msg")) {
        alertCallback(server.arg("title").c_str(), server.arg("msg").c_str());
        server.send(200, "text/plain", "ALERT_ENGAGED");
      } else {
        server.send(400, "text/plain", "Missing title/msg");
      }
    });

    server.begin();
    Serial.println(F("[HTTP] REST API Server online (:80)"));
  }

  void handle() {
    server.handleClient();
  }
};
