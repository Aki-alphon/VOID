import {StyleSheet} from 'react-native';
import {Theme} from '../../../../utils/types';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      paddingVertical: 8,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors.outline,
    },
    scrollContent: {
      paddingHorizontal: 16,
      gap: 8,
    },
    chip: {
      borderColor: 'rgba(224, 220, 208, 0.22)',
      backgroundColor: '#181714',
      borderRadius: 3,
      borderWidth: 1.5,
      height: 30,
      elevation: 2,
      shadowColor: '#000000',
      shadowOffset: {width: 1, height: 1},
      shadowOpacity: 1,
      shadowRadius: 0,
    },
    activeChip: {
      backgroundColor: '#FFFFFF',
      borderColor: '#FFFFFF',
    },
    chipText: {
      fontFamily: 'Ndot-57',
      fontSize: 11,
      letterSpacing: 1.0,
      color: '#A0A5AE',
      textTransform: 'uppercase',
    },
    activeChipText: {
      color: '#000000',
      fontWeight: '800',
    },
  });
