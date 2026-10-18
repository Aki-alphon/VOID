import {StyleSheet} from 'react-native';

import type {Theme} from '../../../../utils/types';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    root: {
      height: 28,
      paddingHorizontal: 12,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: theme.colors.outline,
      backgroundColor: theme.colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
    },
    label: {
      fontFamily: 'JetBrainsMono-Medium',
      fontSize: 11,
      letterSpacing: 1.2,
      textTransform: 'uppercase',
      color: theme.colors.textSecondary,
    },
  });
