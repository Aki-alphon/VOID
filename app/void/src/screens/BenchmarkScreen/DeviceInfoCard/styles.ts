import {StyleSheet} from 'react-native';

import type {Theme} from '../../../utils/types';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    deviceInfoCard: {
      marginBottom: 16,
      backgroundColor: '#181714',
      borderWidth: 1.5,
      borderColor: 'rgba(224, 220, 208, 0.20)',
      borderRadius: 4,
      elevation: 2,
      shadowColor: '#000000',
      shadowOffset: {width: 2, height: 2},
      shadowOpacity: 1,
      shadowRadius: 0,
    },
    deviceInfoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 4,
    },
    deviceInfoLabel: {
      color: theme.colors.onSurfaceVariant,
      flexShrink: 0,
      marginRight: 8,
    },
    deviceInfoValue: {
      color: theme.colors.onSurface,
      flex: 1,
      textAlign: 'right',
      flexWrap: 'wrap',
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
    },
    headerContent: {
      flex: 1,
    },
    headerSummary: {
      color: theme.colors.onSurfaceVariant,
      marginTop: 4,
    },
    section: {
      marginVertical: 8,
    },
    sectionTitle: {
      color: theme.colors.primary,
      marginBottom: 8,
      textTransform: 'uppercase',
    },
  });
