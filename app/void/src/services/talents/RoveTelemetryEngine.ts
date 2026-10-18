/**
 * PROJECT VOID OS // ROVE TELEMETRY TALENT ENGINE
 * Allows LLM agent running in VOID OS to query live ROVE hardware telemetry:
 * - Link state (online/offline)
 * - Proximity distance (meters) via Log-Distance Path Loss RF model
 * - WiFi RSSI (dBm)
 * - RTT latency (ms)
 * - Optical camera snapshot endpoint
 */

import {TalentEngine, TalentResult, ToolDefinition} from './types';
import {roveHardwareService} from '../rove';

export class RoveTelemetryEngine implements TalentEngine {
  readonly name = 'rove_telemetry';

  async execute(_args: Record<string, any>): Promise<TalentResult> {
    const telemetry = roveHardwareService.getTelemetry();
    
    if (!telemetry.isConnected) {
      return {
        type: 'text',
        summary: `ROVE Hardware Node (XIAO ESP32-S3 Sense) is currently OFFLINE at ${telemetry.boardIp}:${telemetry.wsPort}. Attempting to re-establish neural link.`,
      };
    }

    const summary = [
      `ROVE Hardware Node: LINK ONLINE`,
      `Target IP: ${telemetry.boardIp}:${telemetry.wsPort}`,
      `Link Latency (RTT): ${telemetry.rttMs}ms`,
      `WiFi RSSI Signal: ${telemetry.rssi} dBm`,
      `Estimated Operator Distance: ~${telemetry.estimatedDistanceMeters} meters (via indoor RF log-distance model)`,
      `Camera Snapshot URL: ${roveHardwareService.getSnapshotUrl()}`,
    ].join('\n');

    return {
      type: 'text',
      summary,
    };
  }

  toToolDefinition(): ToolDefinition {
    return {
      type: 'function',
      function: {
        name: this.name,
        description:
          'Queries live hardware telemetry from the ROVE companion node (Seeed Studio XIAO ESP32-S3 Sense), including WiFi RSSI signal strength, estimated distance/proximity to operator in meters, network latency, and camera snapshot availability.',
        parameters: {
          type: 'object',
          properties: {},
        },
      },
    };
  }

  systemPromptFragment(): string {
    return 'You have access to the rove_telemetry tool to check Seeed Studio XIAO ESP32-S3 Sense companion node status, WiFi RSSI proximity/distance, latency, and optical camera URL.';
  }
}
