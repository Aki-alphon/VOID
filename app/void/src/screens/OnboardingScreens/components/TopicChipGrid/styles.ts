import {StyleSheet} from 'react-native';

import type {Theme} from '../../../../utils/types';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: 362,
      gap: theme.spacing.s,
    },
    cell: {
      // Figma chips: 177×160 exactly. 362-width grid with 8px gap →
      // (362-8)/2 = 177 per cell.
      width: 177,
      height: 160,
    },
    chip: {
      flex: 1,
      borderRadius: 8,
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.outline,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.ml,
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing.sm,
    },
    chipElse: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.colors.outline,
      borderStyle: 'dashed',
    },
    chipSelected: {
      backgroundColor: theme.colors.surfaceVariant,
      borderColor: theme.dark ? '#FFFFFF' : theme.colors.primary,
      borderWidth: 1.5,
    },
    label: {
      fontFamily: 'Inter-Bold',
      fontWeight: '700',
      fontSize: 14,
      letterSpacing: 0.3,
      color: theme.colors.onBackground,
      textAlign: 'center',
      width: '100%',
    },
    description: {
      fontFamily: 'Inter-Regular',
      fontSize: 11,
      lineHeight: 16,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      width: '100%',
    },
    textBlock: {
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing.xs,
      width: '100%',
    },
  });
