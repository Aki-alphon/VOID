import {StyleSheet} from 'react-native';

import type {Theme} from '../../../utils/types';
import {FONT_FAMILIES} from '../../../theme/tokens/typography';

export const createStyles = (theme: Theme) => {
  const isFraunces =
    theme.typography.headlineH1.fontFamily === FONT_FAMILIES.FRAUNCES_MEDIUM;
  return StyleSheet.create({
    header: {
      width: 369,
      alignItems: 'center',
      gap: theme.spacing.sm,
    },
    title: {
      fontFamily: 'Inter-Bold',
      fontWeight: '800',
      fontSize: 24,
      lineHeight: 30,
      letterSpacing: -0.4,
      color: theme.colors.onBackground,
      textAlign: 'center',
      width: 279,
    },
    body: {
      fontFamily: 'Inter-Regular',
      fontSize: 13,
      lineHeight: 18,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
  });
};
