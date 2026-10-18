import {StyleSheet} from 'react-native';

import type {Theme} from '../../../utils/types';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    markContainer: {
      position: 'relative',
      padding: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    corner: {
      position: 'absolute',
      width: 10,
      height: 10,
      borderColor: theme.colors.outline,
    },
    cornerTL: {
      top: 0,
      left: 0,
      borderTopWidth: 2,
      borderLeftWidth: 2,
    },
    cornerTR: {
      top: 0,
      right: 0,
      borderTopWidth: 2,
      borderRightWidth: 2,
    },
    cornerBL: {
      bottom: 0,
      left: 0,
      borderBottomWidth: 2,
      borderLeftWidth: 2,
    },
    cornerBR: {
      bottom: 0,
      right: 0,
      borderBottomWidth: 2,
      borderRightWidth: 2,
    },
    brandTitle: {
      fontFamily: 'Inter-Bold',
      fontWeight: '800',
      fontSize: 26,
      letterSpacing: 4.0,
      color: theme.colors.onBackground,
      textTransform: 'uppercase',
      marginTop: 24,
    },
    hudBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginTop: 10,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 4,
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.outline,
    },
    triBar: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 3,
    },
    barBlue: {
      width: 3,
      height: 10,
      backgroundColor: '#7A96B2',
      borderRadius: 1,
    },
    barYellow: {
      width: 3,
      height: 10,
      backgroundColor: '#FFFFFF',
      borderRadius: 1,
    },
    barRed: {
      width: 3,
      height: 10,
      backgroundColor: '#FF2035',
      borderRadius: 1,
    },
    hudTag: {
      fontFamily: 'JetBrainsMono-Medium',
      fontSize: 10,
      letterSpacing: 1.6,
      color: theme.colors.textSecondary,
      textTransform: 'uppercase',
    },
  });
