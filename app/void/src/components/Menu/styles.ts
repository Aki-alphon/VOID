import {StyleSheet} from 'react-native';

import {Theme} from '../../utils/types';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    menu: {
      shadowColor: '#000000',
      shadowRadius: 0,
      shadowOffset: {width: 3, height: 3},
      shadowOpacity: 1,
      elevation: 6,
      borderRadius: 4,
      borderWidth: 1.5,
      borderColor: 'rgba(224, 220, 208, 0.22)',
      maxWidth: '90%',
    },
    menuWithSubmenu: {
      elevation: 0,
      shadowOpacity: 0,
    },
    content: {
      paddingVertical: 4,
      backgroundColor: '#161512',
      borderRadius: 4,
      marginRight: 10,
    },
    contentWithSubmenu: {
      backgroundColor: '#161512',
    },
    groupSeparator: {
      height: 6,
      flexShrink: 0,
      backgroundColor: 'transparent',
    },
    separator: {
      backgroundColor: theme.colors.menuSeparator,
    },
  });
