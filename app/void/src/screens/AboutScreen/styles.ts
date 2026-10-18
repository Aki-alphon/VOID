import {StyleSheet} from 'react-native';
import {EdgeInsets} from 'react-native-safe-area-context';
import {Theme} from '../../utils/types';

export const createStyles = (theme: Theme, insets: EdgeInsets) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#000000',
    },
    container: {
      flexGrow: 1,
      padding: theme.spacing.default,
      paddingBottom: theme.spacing.default + insets.bottom,
      backgroundColor: '#000000',
    },
    card: {
      backgroundColor: '#181714',
      borderRadius: 4,
      borderWidth: 1.5,
      borderColor: 'rgba(224, 220, 208, 0.20)',
      borderTopWidth: 3.5,
      borderTopColor: '#FFFFFF',
      overflow: 'hidden',
      shadowColor: '#000000',
      shadowOffset: {width: 3, height: 3},
      shadowOpacity: 1,
      shadowRadius: 0,
      elevation: 4,
    },
    header: {
      padding: 16,
      backgroundColor: '#121214',
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255, 255, 255, 0.12)',
    },
    logoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
      marginBottom: 12,
    },
    aboutPandaLogo: {
      width: 52,
      height: 52,
      borderRadius: 10,
      borderWidth: 1.5,
      borderColor: 'rgba(255, 255, 255, 0.35)',
      backgroundColor: '#1E1E22',
    },
    headerTitles: {
      flex: 1,
    },
    title: {
      ...theme.fonts.headlineLarge,
      color: '#FFFFFF',
      letterSpacing: 1,
      fontWeight: '800',
    },
    stencilTag: {
      fontFamily: 'Ndot-57',
      fontSize: 11,
      color: '#A0A5AE',
      letterSpacing: 1.2,
      marginTop: 2,
    },
    headerContent: {
      gap: 10,
    },
    description: {
      color: '#D0D4DC',
      marginBottom: 8,
      lineHeight: 20,
    },
    versionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.default / 2,
    },
    versionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surfaceContainerHigh,
      paddingHorizontal: theme.spacing.default,
      paddingVertical: theme.spacing.default / 2,
      borderRadius: theme.borders.default,
      gap: theme.spacing.default / 2,
      borderWidth: 1,
      borderColor: theme.colors.surfaceVariant,
    },
    versionText: {
      ...theme.fonts.bodyMedium,
      color: theme.colors.onSurface,
    },
    llamaBuildText: {
      ...theme.fonts.bodySmall,
      color: theme.colors.onSurfaceVariant,
      marginTop: theme.spacing.default / 2,
      opacity: 0.7,
    },
    section: {
      padding: theme.spacing.default * 2,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.surfaceVariant,
    },
    sectionTitle: {
      ...theme.fonts.titleMedium,
      color: theme.colors.onSurface,
      marginBottom: theme.spacing.default,
    },
    actionButton: {
      borderWidth: 1.5,
      borderColor: 'rgba(224, 220, 208, 0.22)',
      borderRadius: 4,
      backgroundColor: '#181714',
      elevation: 2,
      shadowColor: '#000000',
      shadowOffset: {width: 2, height: 2},
      shadowOpacity: 1,
      shadowRadius: 0,
    },
    orText: {
      ...theme.fonts.bodyMedium,
      color: theme.colors.onSurfaceVariant,
      textAlign: 'center',
      marginVertical: theme.spacing.default,
      opacity: 0.7,
    },
    feedbackButtonContent: {
      flexDirection: 'row-reverse',
    },
    feedbackForm: {
      padding: theme.spacing.default,
    },
    field: {
      marginBottom: theme.spacing.default,
    },
    label: {
      ...theme.fonts.labelMedium,
      color: theme.colors.onSurface,
      marginBottom: theme.spacing.default / 2,
    },
    segmentedButtons: {
      marginTop: theme.spacing.default / 2,
    },
    submitButton: {
      marginTop: theme.spacing.default,
    },
    secondaryButtons: {
      flexDirection: 'row',
    },
    legalRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: theme.spacing.default * 1.5,
      gap: theme.spacing.default / 2,
    },
    legalLink: {
      ...theme.fonts.bodySmall,
      color: theme.colors.onSurfaceVariant,
    },
    legalSeparator: {
      ...theme.fonts.bodySmall,
      color: theme.colors.onSurfaceVariant,
      opacity: 0.5,
    },
  });
