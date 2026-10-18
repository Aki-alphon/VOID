import {StyleSheet} from 'react-native';

import type {Theme} from '../../../../utils/types';

// Figma palette for the recommended (Balanced) card — sourced from
// the canonical file's `Color/Yellow/*` band.
const RECOMMENDED_BG = '#F5DBBC'; // Color/yellow/subtle
const RECOMMENDED_BORDER = '#A86C34'; // Color/yellow/highest-contrast
const RECOMMENDED_BADGE_TEXT = '#F8F1E2'; // Color/yellow/mute

export const createStyles = (
  theme: Theme,
  selected: boolean,
  recommended: boolean,
) => {
  const isDark = theme.dark;
  const recommendedBg = isDark ? '#18171C' : '#F7EDD5';
  const recommendedBorder = isDark ? 'rgba(255, 255, 255, 0.4)' : '#C89018';
  const badgeBg = isDark ? '#FFFFFF' : '#C89018';
  const badgeText = isDark ? '#000000' : '#FFFFFF';
  const cardBg = selected
    ? (isDark ? '#1C1C22' : '#FAF6ED')
    : (recommended ? recommendedBg : (isDark ? '#121214' : theme.colors.surface));
  const cardBorder = selected
    ? (isDark ? '#FFFFFF' : theme.colors.primary)
    : (recommended ? recommendedBorder : theme.colors.outline);

  return StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.sm,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.ml,
      borderRadius: 8,
      borderWidth: selected || recommended ? 1.5 : 1,
      borderColor: cardBorder,
      backgroundColor: cardBg,
      marginBottom: theme.spacing.s,
      shadowColor: theme.colors.shadow,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    radio: {
      width: 18,
      height: 18,
      borderRadius: 9,
      borderWidth: selected ? 1.5 : 1,
      borderColor: selected ? (isDark ? '#FFFFFF' : theme.colors.primary) : theme.colors.outlineVariant,
      backgroundColor: theme.colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
    },
    radioDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: isDark ? '#FFFFFF' : theme.colors.primary,
    },
    body: {
      flex: 1,
      gap: theme.spacing.xs,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.s,
    },
    title: {
      fontFamily: 'Inter-Bold',
      fontSize: 14,
      fontWeight: '700',
      letterSpacing: 0.2,
      color: theme.colors.onBackground,
    },
    subtitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xs,
    },
    subtitle: {
      fontFamily: 'Inter-Regular',
      fontSize: 11,
      color: theme.colors.textSecondary,
    },
    badge: {
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 4,
      backgroundColor: badgeBg,
    },
    badgeText: {
      fontFamily: 'Inter-Bold',
      fontSize: 10,
      fontWeight: '700',
      letterSpacing: 0.8,
      textTransform: 'uppercase',
      color: badgeText,
    },
  });
};
