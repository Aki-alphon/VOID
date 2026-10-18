import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {SplashMark} from '../../../assets/onboarding/illustrations';
import {useTheme} from '../../../hooks';
import {L10nContext} from '../../../utils';
import {ROUTES} from '../../../utils/navigationConstants';
import {createStyles} from './styles';

const SPLASH_MIN_DWELL_MS = 600;

/**
 * Brand splash — post-hydration, pre-Onboarding-1. Renders the
 * 112×112 mark from Figma `884:28352` then transitions after
 * `SPLASH_MIN_DWELL_MS`.
 */
export const SplashScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const theme = useTheme();
  const styles = createStyles(theme);
  const l10n = useContext(L10nContext);

  React.useEffect(() => {
    const t = setTimeout(() => {
      navigation.replace(ROUTES.ONBOARDING.STEP_1);
    }, SPLASH_MIN_DWELL_MS);
    return () => clearTimeout(t);
  }, [navigation]);

  return (
    <View testID="onboarding-splash" style={styles.root}>
      <View style={styles.markContainer}>
        <View style={[styles.corner, styles.cornerTL]} />
        <View style={[styles.corner, styles.cornerTR]} />
        <View style={[styles.corner, styles.cornerBL]} />
        <View style={[styles.corner, styles.cornerBR]} />
        <SplashMark
          width={100}
          height={100}
          accessibilityLabel={l10n.onboarding.splash.brand}
          accessibilityRole="image"
        />
      </View>

      <View style={styles.hudBadge}>
        <View style={styles.triBar}>
          <View style={styles.barBlue} />
          <View style={styles.barYellow} />
          <View style={styles.barRed} />
        </View>
        <View>
          <Text style={styles.hudTag}>VOID // NEURAL RUNTIME</Text>
        </View>
      </View>
    </View>
  );
};
