import {StyleSheet} from 'react-native';

import type {Theme} from '../../../../utils/types';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    root: {
      width: '100%',
      alignItems: 'center',
      gap: theme.spacing.s,
    },
    eyebrow: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 11,
      fontWeight: '600',
      letterSpacing: 2.0,
      textTransform: 'uppercase',
      color: theme.dark ? '#36D6A8' : theme.colors.primary,
      textAlign: 'center',
    },
    bodyWrap: {
      width: '100%',
      alignItems: 'center',
    },
  });
