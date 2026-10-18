import {StyleSheet} from 'react-native';
import {Theme} from '../../../../utils/types';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    cardOuter: {
      flex: 1,
    },
    container: {
      flex: 1,
      marginBottom: 16,
    },
    containerPressed: {
      transform: [{translateX: 2}, {translateY: 2}],
    },
    card: {
      flex: 1,
      height: '100%',
      backgroundColor: '#181714',
      borderRadius: 4,
      borderWidth: 1.5,
      borderTopWidth: 3.5,
      borderTopColor: '#36D6A8',
      borderColor: 'rgba(224, 220, 208, 0.20)',
      shadowColor: '#000000',
      shadowOffset: {width: 3, height: 3},
      shadowOpacity: 1,
      shadowRadius: 0,
      elevation: 3,
    },
    cardStencilHeader: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 6,
      paddingHorizontal: 2,
    },
    cardCode: {
      fontFamily: 'Ndot-57',
      fontSize: 9,
      color: '#A0A5AE',
      letterSpacing: 1,
    },
    cardRivet: {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: '#282622',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.35)',
    },
    cardInner: {
      flex: 1,
    },
    cardContent: {
      flex: 1,
      padding: 12,
    },
    thumbnail: {
      width: '100%',
      height: 80,
      backgroundColor: '#201E1A',
      borderRadius: 3,
      borderWidth: 1,
      borderColor: 'rgba(224, 220, 208, 0.15)',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 8,
      position: 'relative',
      overflow: 'hidden',
    },
    thumbnailImage: {
      width: '100%',
      height: '100%',
      borderRadius: 3,
    },
    thumbnailOverlay: {
      position: 'absolute',
      bottom: 4,
      right: 4,
      backgroundColor: theme.colors.backdrop,
      borderRadius: 3,
      padding: 4,
      alignItems: 'center',
      justifyContent: 'center',
    },
    thumbnailText: {
      fontFamily: 'Inter-Bold',
      fontSize: 28,
      fontWeight: '800',
      color: '#E0DCD0',
      letterSpacing: 1,
    },

    chatButton: {
      position: 'absolute',
      bottom: 6,
      right: 6,
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: 4,
      width: 28,
      height: 28,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.colors.outline,
    },
    localBadge: {
      position: 'absolute',
      top: 4,
      right: 4,
      backgroundColor: theme.colors.primary,
      borderRadius: 3,
      width: 20,
      height: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    protectionBadge: {
      position: 'absolute',
      top: 4,
      left: 4,
      backgroundColor: theme.colors.tertiary,
      borderRadius: 3,
      width: 18,
      height: 18,
      alignItems: 'center',
      justifyContent: 'center',
    },
    premiumBadge: {
      position: 'absolute',
      top: 16,
      right: 16,
      backgroundColor: theme.colors.secondary,
      borderRadius: 3,
      paddingHorizontal: 6,
      paddingVertical: 2,
      minWidth: 40,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
    },
    purchaseBadge: {
      backgroundColor: theme.colors.tertiaryContainer,
      borderRadius: 3,
      paddingHorizontal: 6,
      paddingVertical: 2,
    },
    purchaseBadgeText: {
      fontSize: 10,
      fontWeight: '600',
      color: theme.colors.onTertiaryContainer,
      letterSpacing: 0.1,
    },
    premiumBadgeText: {
      fontSize: 10,
      fontWeight: '600',
      color: theme.colors.onSecondary,
      letterSpacing: 0.1,
      textAlign: 'center',
    },
    content: {
      flex: 1,
      justifyContent: 'space-between',
      minHeight: 0, // Allow content to shrink
    },
    header: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: 2, // Reduced from 4px
      gap: 4,
      minHeight: 18, // Ensure minimum height for content
    },
    middleContent: {
      justifyContent: 'flex-start',
    },
    palName: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.onSurface,
      flex: 1,
      lineHeight: 18,
      letterSpacing: 0.1, // Subtle letter spacing for better readability
    },
    priceContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: 8,
      paddingHorizontal: 6,
      paddingVertical: 2,
      minWidth: 40,
    },
    price: {
      fontSize: 10,
      fontWeight: '600',
      color: theme.colors.onSurfaceVariant,
      letterSpacing: 0.1,
      textAlign: 'center',
    },
    freePrice: {
      color: theme.colors.onTertiary,
    },
    premiumPrice: {
      color: theme.colors.onSecondary,
    },
    creator: {
      fontSize: 10, // Reduced from 11px
      color: theme.colors.onSurfaceVariant,
      marginBottom: 2, // Reduced from 4px
      fontWeight: '500',
      lineHeight: 12, // Tight line height
    },
    description: {
      fontSize: 11,
      color: theme.colors.onSurfaceVariant,
      lineHeight: 14,
      marginBottom: 4, // Reduced from 6px
    },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 4,
      marginTop: 'auto',
    },
    leftFooter: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 3,
    },
    rating: {
      fontSize: 11,
      fontWeight: '600',
      color: theme.colors.onSurface,
    },
    reviewCount: {
      fontSize: 10,
      color: theme.colors.onSurfaceVariant,
      fontWeight: '500',
    },
    tagsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      flex: 1,
      justifyContent: 'flex-end',
    },
    tag: {
      borderColor: theme.colors.outline,
      borderRadius: 4,
      backgroundColor: theme.colors.surfaceContainerHigh,
    },
    tagText: {
      fontSize: 9,
      lineHeight: 11,
      fontWeight: '500',
    },
    moreTagsText: {
      fontSize: 9,
      color: theme.colors.onSurfaceVariant,
      fontWeight: '500',
    },
    nameSection: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 4,
    },
    headerActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    actionButton: {
      margin: 0,
      padding: 0,
      width: 24,
      height: 24,
    },
    warningContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 2,
      paddingHorizontal: 6,
      paddingVertical: 3,
      borderRadius: 6,
      backgroundColor: theme.colors.errorContainer + '20', // 20% opacity
      borderWidth: 0.5,
      borderColor: theme.colors.error + '40', // 40% opacity
      marginBottom: 4,
      // Add subtle glow effect in dark mode
      ...(theme.dark
        ? {
            shadowColor: theme.colors.error,
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 0.15,
            shadowRadius: 4,
          }
        : {}),
    },
    warningIcon: {
      margin: 0,
      padding: 0,
      width: 14,
      height: 14,
    },
    warningText: {
      flex: 1,
      fontSize: 9,
      lineHeight: 11,
      color: theme.colors.error,
      fontWeight: '500',
    },
  });
