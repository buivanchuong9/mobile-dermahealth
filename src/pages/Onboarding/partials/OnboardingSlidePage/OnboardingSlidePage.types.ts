import type { Animated } from 'react-native';
import type { OnboardingSlide } from '../../onboardingSlides';

export type OnboardingSlidePageProps = {
  readonly slide: OnboardingSlide;
  readonly width: number;
  readonly index: number;
  readonly active: boolean;
  readonly scrollX: Animated.Value;
};
