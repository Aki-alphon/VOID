import {StyleSheet} from 'react-native';

import type {Theme} from '../../../utils/types';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    header: {
      alignItems: 'center',
      gap: theme.spacing.sm,
      paddingHorizontal: theme.spacing.m,
    },
    palBody: {
      fontFamily: 'Inter-Regular',
      fontSize: 13,
      lineHeight: 19,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      width: 335,
    },
    subtitle: {
      fontFamily: 'Inter-Medium',
      fontSize: 12,
      letterSpacing: 0.3,
      color: theme.colors.onSurfaceVariant,
      textAlign: 'center',
      marginTop: theme.spacing.ml,
      marginBottom: theme.spacing.s,
    },
    options: {
      width: 335,
      alignSelf: 'center',
    },
  });
