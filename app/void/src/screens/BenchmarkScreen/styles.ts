import {Platform, StyleSheet} from 'react-native';
import type {Theme} from '../../utils/types';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollView: {
      flex: 1,
      padding: 16,
    },
    card: {
      marginBottom: 16,
      backgroundColor: '#161512',
      borderWidth: 1.5,
      borderColor: 'rgba(224, 220, 208, 0.20)',
      borderRadius: 4,
    },
    description: {
      flex: 1,
      color: theme.colors.onSurfaceVariant,
      paddingRight: 8,
      fontSize: 12,
    },
    warning: {
      color: theme.colors.error,
      marginVertical: 8,
      textAlign: 'center',
    },
    button: {
      marginVertical: 10,
      backgroundColor: '#FFFFFF',
      borderRadius: 4,
      elevation: 3,
      shadowColor: '#000000',
      shadowOffset: {width: 2, height: 2},
      shadowOpacity: 1,
      shadowRadius: 0,
    },
    loadingContainer: {
      alignItems: 'center',
      marginVertical: 8,
    },
    loadingText: {
      marginTop: 8,
      color: theme.colors.onSurfaceVariant,
    },
    modelSelectorContent: {
      justifyContent: 'space-between',
      flexDirection: 'row-reverse',
      alignItems: 'center',
    },
    presetContainer: {
      flexDirection: 'row',
      marginBottom: 16,
      justifyContent: 'space-around',
      flexWrap: 'wrap',
      gap: 8,
    },
    presetButton: {
      flex: 1,
      minWidth: 100,
      marginHorizontal: 4,
    },
    slidersContainer: {
      marginTop: 16,
    },
    sliderDescriptionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    settingItem: {
      marginBottom: 16,
    },
    settingLabel: {
      color: theme.colors.primary,
      marginBottom: 0,
    },
    settingValue: {
      textAlign: 'right',
      color: theme.colors.onSurface,
      marginTop: 0,
      minWidth: 40,
      marginLeft: 8,
    },
    slider: {
      //height: 40,
      ...Platform.select({
        android: {
          marginLeft: -12,
          marginRight: -10,
        },
      }),
    },
    sectionTitle: {
      color: theme.colors.primary,
      marginBottom: 8,
    },
    advancedButton: {
      marginBottom: 6,
    },
    advancedDescription: {
      marginBottom: 16,
      color: theme.colors.onSurfaceVariant,
      fontSize: 12,
    },
    warningContainer: {
      backgroundColor: '#261A1D',
      padding: 14,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: 'rgba(200, 102, 118, 0.4)',
      marginBottom: 16,
    },
    warningList: {
      marginTop: 8,
      paddingLeft: 8,
    },
    warningText: {
      color: '#E8A0AD',
      marginVertical: 4,
      fontSize: 12,
      lineHeight: 18,
    },
    resultsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 8,
    },
    resultsCard: {
      marginTop: 16,
      padding: 0,
    },
    resultItem: {
      marginBottom: 16,
    },
    errorText: {
      marginTop: 16,
      color: theme.colors.error,
    },
    dialogList: {
      marginVertical: 10,
      paddingLeft: 8,
    },
    dialogSection: {
      marginTop: 16,
      marginBottom: 8,
      fontWeight: '600',
    },
    link: {
      textDecorationLine: 'underline',
    },
    detailsButton: {
      marginTop: 16,
      alignSelf: 'flex-start',
    },
    detailsContainer: {
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: 8,
      padding: 12,
      marginTop: 8,
    },
    codeBlock: {
      fontFamily: Platform.select({ios: 'Menlo', android: 'monospace'}),
      fontSize: 11,
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 24,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: theme.colors.surfaceVariant,
    },
    checkboxLabel: {
      color: theme.colors.onSurfaceVariant,
      fontSize: 12,
      marginLeft: 12,
      flex: 1,
    },
    maxValueHint: {
      color: theme.colors.onSurfaceVariant,
      fontStyle: 'italic',
    },
  });
