import {I18nManager, StyleSheet} from 'react-native';

import type {Theme} from '../../../../utils/types';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    body: {
      flex: 1,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.m,
      position: 'relative',
    },
    bodyCentered: {
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing.xl,
    },
    bodyTop: {
      alignItems: 'center',
      paddingTop: theme.spacing.xxl,
      gap: theme.spacing.ml,
    },
    topLeftSlot: {
      position: 'absolute',
      top: 16,
      // Logical start edge: physical left in LTR, physical right in RTL.
      ...(I18nManager.isRTL ? {right: 16} : {left: 16}),
      zIndex: 2,
    },
    bottom: {
      paddingHorizontal: 0,
    },
  });
