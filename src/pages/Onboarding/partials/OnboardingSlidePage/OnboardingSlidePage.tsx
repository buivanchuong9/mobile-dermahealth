import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useReducedMotion } from '@components/motion';
import { Typography } from '@components/primitives';
import { translate } from '@i18n';
import { OnboardingArtwork } from '../OnboardingArtwork/OnboardingArtwork';
import type { OnboardingSlidePageProps } from './OnboardingSlidePage.types';

export function OnboardingSlidePage({
  slide,
  width,
  index,
  active,
  scrollX,
}: OnboardingSlidePageProps) {
  const { height, fontScale } = useWindowDimensions();
  const reducedMotion = useReducedMotion();
  const artworkHeight = Math.max(
    210,
    Math.min(310, height * (fontScale > 1.2 ? 0.29 : 0.38)),
  );
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const artworkStyle = reducedMotion
    ? undefined
    : {
        opacity: scrollX.interpolate({
          inputRange,
          outputRange: [0.65, 1, 0.65],
          extrapolate: 'clamp',
        }),
        transform: [
          {
            translateX: scrollX.interpolate({
              inputRange,
              outputRange: [35, 0, -35],
              extrapolate: 'clamp',
            }),
          },
          {
            scale: scrollX.interpolate({
              inputRange,
              outputRange: [0.94, 1, 0.94],
              extrapolate: 'clamp',
            }),
          },
        ],
      };
  return (
    <ScrollView
      style={{ width }}
      contentContainerStyle={styles.page}
      showsVerticalScrollIndicator={false}
      accessibilityElementsHidden={!active}
      importantForAccessibility={active ? 'auto' : 'no-hide-descendants'}
    >
      <Animated.View style={artworkStyle}>
        <OnboardingArtwork id={slide.id} height={artworkHeight} />
      </Animated.View>
      <View style={styles.copy}>
        <Text style={styles.kicker}>
          {translate(`onboarding.slides.${slide.id}.eyebrow`)}
        </Text>
        <Typography variant="display" accessibilityRole="header">
          {translate(`onboarding.slides.${slide.id}.title`)}
        </Typography>
        <Typography tone="secondary">
          {translate(`onboarding.slides.${slide.id}.body`)}
        </Typography>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
    gap: 20,
    flexGrow: 1,
    justifyContent: 'center',
  },
  copy: { gap: 10 },
  kicker: {
    color: '#1D4ED8',
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '700',
    letterSpacing: 1.1,
  },
});
