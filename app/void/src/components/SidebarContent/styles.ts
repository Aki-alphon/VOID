import {StyleSheet} from 'react-native';

import {MD3Theme} from 'react-native-paper';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    sidebarContainer: {
      flex: 1,
      backgroundColor: '#100F0E',
    },
    menuContainer: {
      paddingBottom: 6,
    },
    drawerHeader: {
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 10,
      backgroundColor: '#181714',
      borderBottomWidth: 1.5,
      borderBottomColor: 'rgba(224, 220, 208, 0.18)',
    },
    drawerHeaderTop: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    pandaLogoBadge: {
      width: 32,
      height: 32,
      borderRadius: 6,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.25)',
      backgroundColor: '#1E1E22',
    },
    pandaLogoImage: {
      width: '100%',
      height: '100%',
    },
    drawerHeaderTitle: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '800',
      letterSpacing: 1.5,
    },
    specBadge: {
      marginLeft: 'auto',
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 2,
    },
    specBadgeText: {
      fontFamily: 'Ndot-57',
      color: '#000000',
      fontSize: 10,
      fontWeight: '800',
      letterSpacing: 1,
    },
    drawerHeaderSub: {
      color: '#8A9AAA',
      fontSize: 10,
      fontWeight: '700',
      letterSpacing: 1.2,
      marginTop: 4,
      textTransform: 'uppercase',
    },
    mechaNavColumn: {
      paddingHorizontal: 12,
      paddingTop: 10,
      paddingBottom: 6,
      flexDirection: 'column',
      gap: 6,
    },
    mechaRow: {
      width: '100%',
      height: 48,
      backgroundColor: '#181714',
      borderWidth: 1.5,
      borderColor: 'rgba(224, 220, 208, 0.16)',
      borderLeftWidth: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    mechaRowPressed: {
      backgroundColor: '#262420',
      borderColor: 'rgba(255, 255, 255, 0.35)',
    },
    // Backwards-compatible aliases
    mechaNavGrid: {
      paddingHorizontal: 12,
      paddingTop: 10,
      paddingBottom: 6,
      flexDirection: 'column',
      gap: 6,
    },
    mechaCard: {
      width: '100%',
      height: 48,
      backgroundColor: '#181714',
      borderWidth: 1.5,
      borderColor: 'rgba(224, 220, 208, 0.16)',
      borderLeftWidth: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    mechaCardPressed: {
      backgroundColor: '#262420',
      borderColor: 'rgba(255, 255, 255, 0.35)',
    },
    cardThemeWhite: {
      borderLeftColor: '#FFFFFF',
      borderTopColor: '#FFFFFF',
    },
    cardThemeMint: {
      borderLeftColor: '#36D6A8',
      borderTopColor: '#36D6A8',
    },
    cardThemeAmber: {
      borderLeftColor: '#FFAA00',
      borderTopColor: '#FFAA00',
    },
    cardThemeBlue: {
      borderLeftColor: '#4D96FF',
      borderTopColor: '#4D96FF',
    },
    cardThemeRed: {
      borderLeftColor: '#FF2035',
      borderTopColor: '#FF2035',
    },
    cardThemePurple: {
      borderLeftColor: '#A78BFA',
      borderTopColor: '#A78BFA',
    },
    rowCodeBadge: {
      backgroundColor: 'rgba(255, 255, 255, 0.06)',
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 2,
      marginRight: 10,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.10)',
    },
    rowCode: {
      fontFamily: 'Ndot-57',
      fontSize: 10,
      color: '#A0A5AE',
      letterSpacing: 1.2,
    },
    rowGlyphWrap: {
      width: 28,
      height: 28,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 10,
    },
    rowLabel: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: '800',
      letterSpacing: 1.2,
      textTransform: 'uppercase',
      flex: 1,
    },
    rowRivet: {
      width: 5,
      height: 5,
      borderRadius: 2.5,
      backgroundColor: '#282622',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.40)',
    },
    // Backwards-compatible aliases
    cardStencilHeader: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    cardCode: {
      fontFamily: 'Ndot-57',
      fontSize: 10,
      color: '#A0A5AE',
      letterSpacing: 1.2,
    },
    cardRivet: {
      width: 5,
      height: 5,
      borderRadius: 2.5,
      backgroundColor: '#282622',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.40)',
    },
    cardGlyphWrap: {
      width: 28,
      height: 28,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 10,
    },
    cardLabel: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: '800',
      letterSpacing: 1.2,
      textTransform: 'uppercase',
      flex: 1,
    },
    divider: {
      marginHorizontal: 16,
      backgroundColor: 'rgba(255, 255, 255, 0.12)',
      height: 1,
    },
    contentWrapper: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#100F0E',
    },
    sessionDrawerItem: {
      height: 40,
      borderRadius: 4,
    },
    menuDrawerItem: {
      height: 44,
      borderRadius: 4,
    },
    versionText: {
      color: theme.colors.onSurfaceVariant,
      opacity: 0.7,
      fontSize: 12,
      fontWeight: '500',
    },
    drawerSection: {
      marginTop: 10,
    },
    dateLabel: {
      paddingLeft: 16,
      paddingVertical: 10,
    },
    scrollViewContent: {
      flexGrow: 1,
      minHeight: '100%',
    },
    mainContent: {
      flex: 1,
    },
    menu: {
      width: 170,
    },
    sessionItem: {
      position: 'relative',
    },
    sessionTouchable: {
      flex: 1,
    },
    // Selection mode styles
    selectionModeHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.outline,
      backgroundColor: theme.colors.surface,
    },
    selectedCountText: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.onSurface,
      flex: 1,
      textAlign: 'center',
    },
    sessionItemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      position: 'relative',
    },
    sessionCheckbox: {
      marginLeft: 8,
      marginRight: 4,
    },
    menuDivider: {
      marginVertical: 4,
    },
    // Header action buttons (export, delete icons)
    headerActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    headerActionButton: {
      padding: 4,
    },
    headerActionButtonDisabled: {
      opacity: 0.4,
    },
    // Select all row
    selectAllRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.surface,
    },
    selectAllCheckbox: {
      marginRight: 12,
    },
    selectAllText: {
      fontSize: 16,
      color: theme.colors.onSurface,
    },
    selectAllDivider: {
      backgroundColor: theme.colors.outline,
      opacity: 0.3,
    },
  });
