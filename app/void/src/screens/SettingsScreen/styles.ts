import {StyleSheet} from 'react-native';

import {Theme} from '../../utils/types';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#000000',
    },
    container: {
      padding: 16,
      backgroundColor: '#000000',
    },
    scrollViewContent: {
      paddingVertical: 16,
      paddingHorizontal: 16,
      backgroundColor: '#000000',
    },
    card: {
      marginVertical: 8,
      borderRadius: 4,
      backgroundColor: '#181714',
      borderWidth: 1.5,
      borderColor: 'rgba(224, 220, 208, 0.20)',
      borderTopWidth: 3,
      borderTopColor: '#FFFFFF',
      elevation: 2,
      shadowColor: '#000000',
      shadowOffset: {width: 2, height: 2},
      shadowOpacity: 1,
      shadowRadius: 0,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    },
    cardTitle: {
      color: '#FFFFFF',
      fontSize: 11,
      fontWeight: '800',
      letterSpacing: 1.8,
      textTransform: 'uppercase',
      fontFamily: 'Ndot-57',
    },
    cardRivet: {
      width: 5,
      height: 5,
      borderRadius: 2.5,
      backgroundColor: '#282622',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.35)',
    },
    settingItemContainer: {
      marginVertical: 16,
    },
    switchContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 8,
    },
    textContainer: {
      flex: 1,
      marginRight: 16,
    },
    labelWithIconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    settingIcon: {
      marginRight: 8,
    },
    textLabel: {
      color: theme.colors.onSurface,
    },
    textDescription: {
      color: theme.colors.onSurfaceVariant,
      //marginTop: 4,
    },
    divider: {
      marginVertical: 12,
    },
    slider: {
      //marginVertical: 8,
      //height: 40,
    },
    textInput: {
      marginVertical: 8,
    },
    invalidInput: {
      borderColor: theme.colors.error,
      borderWidth: 1,
    },
    errorText: {
      color: theme.colors.error,
      marginTop: 4,
    },
    // Cap the value side of a settings row so a long value label ellipsizes
    // inside the button instead of squeezing the flex title/description
    // column into a sliver.
    menuContainer: {
      position: 'relative',
      flexShrink: 1,
      maxWidth: '55%',
    },
    menuButton: {
      minWidth: 100,
      maxWidth: '100%',
    },
    // A control too wide to share its row (e.g. the draft-model picker, whose
    // values are model filenames) sits under the title/description instead.
    // Also keeps the menu anchor at the row's left edge, on-screen.
    fullRowControl: {
      marginTop: 8,
      alignSelf: 'flex-start',
      maxWidth: '100%',
    },
    consentContainer: {
      marginVertical: 8,
    },
    consentButton: {
      alignSelf: 'flex-end',
      marginTop: 12,
    },
    buttonContent: {
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
    },
    advancedSettingsButton: {
      marginVertical: 8,
    },
    advancedSettingsContent: {
      marginTop: 8,
    },
    advancedAccordion: {
      height: 55,
      //backgroundColor: theme.colors.surface,
    },
    accordionTitle: {
      fontSize: 14,
      color: theme.colors.secondary,
    },
    // Floor, not a fixed width: dropdown items size to their longest label
    // (the outer menu clamps at 90% screen and item titles ellipsize past it).
    menu: {
      minWidth: 170,
    },
    linkContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 4,
    },
    linkIcon: {
      marginLeft: 4,
    },
    segmentedButtons: {
      marginVertical: 8,
    },
  });
