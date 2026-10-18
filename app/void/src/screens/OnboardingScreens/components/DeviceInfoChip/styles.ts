import {StyleSheet} from 'react-native';

import type {Theme} from '../../../../utils/types';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    chip: {
      alignSelf: 'center',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 4,
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.outline,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xs,
    },
    text: {
      fontFamily: 'JetBrainsMono-Regular',
      fontSize: 11,
      letterSpacing: 0.5,
      color: theme.colors.textSecondary,
    },
    bullet: {
      width: 2,
      height: 2,
      borderRadius: 1,
      backgroundColor: theme.colors.outline,
    },
  });
