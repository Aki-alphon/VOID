import {StyleSheet} from 'react-native';

import {Theme} from '../../../utils/types';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    menu: {
      maxWidth: '90%',
      marginTop: 0,
      marginLeft: 0,
    },
    content: {
      paddingVertical: 4,
      backgroundColor: '#161512',
      borderRadius: 4,
      borderWidth: 1.5,
      borderColor: 'rgba(224, 220, 208, 0.22)',
    },
  });
