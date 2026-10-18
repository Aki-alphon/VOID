import {StyleSheet} from 'react-native';

import {MessageType, Theme} from '../../utils/types';

export const styles = ({
  currentUserIsAuthor,
  message,
  roundBorder,
  theme,
}: {
  currentUserIsAuthor: boolean;
  message: MessageType.Any;
  roundBorder: boolean;
  theme: Theme;
}) => {
  return StyleSheet.create({
    contentContainer: {
      backgroundColor:
        !currentUserIsAuthor || message.type === 'image'
          ? 'transparent'
          : '#1E1E22',
      borderBottomLeftRadius:
        currentUserIsAuthor || roundBorder
          ? 14
          : 4,
      borderBottomRightRadius: currentUserIsAuthor
        ? roundBorder
          ? 14
          : 4
        : 14,
      borderTopLeftRadius: 14,
      borderTopRightRadius: 14,
      borderColor: currentUserIsAuthor ? 'rgba(255, 255, 255, 0.14)' : 'transparent',
      borderWidth: currentUserIsAuthor ? 1 : 0,
      paddingHorizontal: currentUserIsAuthor ? 14 : 0,
      paddingVertical: currentUserIsAuthor ? 8 : 0,
      overflow: 'hidden',
    },
    dateHeader0: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 32,
      marginTop: 16,
    },
    dateHeaderContainer: {
      textAlign: 'right',
      paddingBottom: 12,
      marginTop: -8,
      marginLeft: 20,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    dateHeader: {
      fontFamily: 'Ndot-57',
      color: theme.colors.textSecondary,
      fontSize: 10,
      letterSpacing: 0.8,
    },
    iconContainer: {
      color: theme.colors.textSecondary,
      fontSize: 16,
    },
  });
};
