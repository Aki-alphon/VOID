/**
 * PROJECT VOID OS // ROVE HARDWARE STATUS HUD
 * Compact tactical HUD bar showing real-time XIAO ESP32-S3 link telemetry:
 * - WebSocket link status (ONLINE / OFFLINE)
 * - RTT latency (ms)
 * - RF WiFi RSSI (dBm) and log-distance proximity estimate
 */

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {observer} from 'mobx-react';
import {useTheme} from '../../hooks';
import {roveStore} from '../../store';

interface Props {
  onPress?: () => void;
}

export const RoveHardwareHUD: React.FC<Props> = observer(({onPress}) => {
  const theme = useTheme();
  const isOnline = roveStore.isConnected;
  const rssi = roveStore.rssi;
  const dist = roveStore.estimatedDistanceMeters;
  const rtt = roveStore.rttMs;
  const ip = roveStore.boardIp;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderColor: isOnline ? theme.colors.primary : theme.colors.outline,
        },
      ]}>
      {/* Link indicator dot */}
      <View style={styles.statusSection}>
        <View
          style={[
            styles.dot,
            {
              backgroundColor: isOnline
                ? theme.colors.tertiary
                : theme.colors.error,
            },
          ]}
        />
        <Text
          style={[
            styles.label,
            {
              color: isOnline ? theme.colors.primary : theme.colors.textSecondary,
            },
          ]}>
          ROVE // {isOnline ? 'LINK ONLINE' : 'NODE OFFLINE'}
        </Text>
      </View>

      {/* Real-time telemetry readouts */}
      <View style={styles.telemetrySection}>
        {isOnline ? (
          <>
            <Text style={[styles.telemetryText, {color: theme.colors.secondary}]}>
              {rtt > 0 ? `${rtt}ms` : '--'}
            </Text>
            <Text style={styles.divider}>•</Text>
            <Text style={[styles.telemetryText, {color: theme.colors.text}]}>
              {rssi} dBm
            </Text>
            <Text style={styles.divider}>•</Text>
            <Text
              style={[
                styles.telemetryText,
                {color: theme.colors.onSurfaceVariant},
              ]}>
              ~{dist}m
            </Text>
          </>
        ) : (
          <Text
            style={[
              styles.telemetryText,
              {color: theme.colors.onSurfaceVariant},
            ]}>
            {ip}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginHorizontal: 14,
    marginTop: 6,
    marginBottom: 4,
    borderRadius: 4,
    borderWidth: 1,
  },
  statusSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  label: {
    fontFamily: 'Ndot-57',
    fontSize: 11,
    letterSpacing: 1.2,
  },
  telemetrySection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  telemetryText: {
    fontFamily: 'Ndot-57',
    fontSize: 11,
    letterSpacing: 0.6,
  },
  divider: {
    color: 'rgba(255, 255, 255, 0.25)',
    fontSize: 8,
  },
});
