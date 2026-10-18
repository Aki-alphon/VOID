import React from 'react';
import {StyleSheet, View, ViewStyle, StyleProp} from 'react-native';
import WebView from 'react-native-webview';
import {SINGULARITY_HTML} from './singularityBundle';

interface SingularityCoreViewProps {
  size?: number;
  width?: number | string;
  height?: number | string;
  interactive?: boolean;
  style?: StyleProp<ViewStyle>;
  showReticle?: boolean;
}

export const SingularityCoreView: React.FC<SingularityCoreViewProps> = ({
  size,
  width = size ?? '100%',
  height = size ?? 350,
  interactive = false,
  style,
  showReticle = false,
}) => {
  return (
    <View
      style={[
        styles.container,
        {width: width as any, height: height as any},
        style,
      ]}
      pointerEvents={interactive ? 'auto' : 'none'}>
      {showReticle && (
        <>
          <View style={[styles.corner, styles.cornerTL]} />
          <View style={[styles.corner, styles.cornerTR]} />
          <View style={[styles.corner, styles.cornerBL]} />
          <View style={[styles.corner, styles.cornerBR]} />
        </>
      )}

      <WebView
        originWhitelist={['*']}
        source={{html: SINGULARITY_HTML}}
        style={[styles.webview, {width: '100%', height: '100%'}]}
        containerStyle={styles.webContainer}
        scrollEnabled={false}
        bounces={false}
        overScrollMode="never"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        androidLayerType="hardware"
        javaScriptEnabled={true}
        domStorageEnabled={true}
        pointerEvents={interactive ? 'auto' : 'none'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  webContainer: {
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
  },
  webview: {
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
  },
  corner: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderColor: 'rgba(212, 201, 168, 0.35)',
    zIndex: 1,
  },
  cornerTL: {
    top: -2,
    left: -2,
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
  },
  cornerTR: {
    top: -2,
    right: -2,
    borderTopWidth: 1.5,
    borderRightWidth: 1.5,
  },
  cornerBL: {
    bottom: -2,
    left: -2,
    borderBottomWidth: 1.5,
    borderLeftWidth: 1.5,
  },
  cornerBR: {
    bottom: -2,
    right: -2,
    borderBottomWidth: 1.5,
    borderRightWidth: 1.5,
  },
});
