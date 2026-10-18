import {StyleSheet} from 'react-native';

import type {Theme} from '../../../../utils/types';

export const createStyles = (theme: Theme, align: 'left' | 'center') =>
  StyleSheet.create({
    bodyText: {
      ...theme.typography.bodyM,
      color: theme.colors.onSurfaceVariant,
      textAlign: align,
    },
    pillRun: {
      backgroundColor: theme.colors.accent.peach,
      color: theme.colors.text,
    },
  });
