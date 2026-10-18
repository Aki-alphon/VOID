import {StyleSheet} from 'react-native';
import {Theme} from '../../../../utils/types';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surfaceContainerHigh,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors.outline,
    },
    authenticatedContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    welcomeText: {
      fontSize: 14,
      fontWeight: '500',
      color: theme.colors.onSurface,
      flex: 1,
    },
    unauthenticatedContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
    },
    infoSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      flex: 1,
    },
    infoText: {
      fontSize: 13,
      color: theme.colors.onSurfaceVariant,
      flex: 1,
      lineHeight: 18,
    },
    actionsSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    signInButton: {
      borderRadius: 4,
      minWidth: 80,
      backgroundColor: '#FFFFFF',
      elevation: 2,
      shadowColor: '#000000',
      shadowOffset: {width: 2, height: 2},
      shadowOpacity: 1,
      shadowRadius: 0,
    },
    signInButtonLabel: {
      fontSize: 12,
      fontWeight: '800',
      letterSpacing: 1,
      color: '#121110',
    },
    dismissButton: {
      margin: 0,
    },
  });
