import {StyleSheet} from 'react-native';

import {Theme} from '../../utils/types';

export const styles = ({theme}: {theme: Theme}) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: 12,
      gap: 5,
    },
    timing: {
      fontFamily: 'Ndot-57',
      color: theme.colors.textSecondary,
      fontSize: 10,
      letterSpacing: 0.6,
    },
    interruptedStatus: {
      fontFamily: 'Ndot-57',
      color: theme.colors.error,
      fontSize: 10,
      letterSpacing: 0.6,
    },
  });
