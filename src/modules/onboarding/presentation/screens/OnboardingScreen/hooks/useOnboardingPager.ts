import { useRef, useState } from 'react';
import { Animated, useWindowDimensions } from 'react-native';
import type {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { ONBOARDING_SLIDES } from '../../../onboardingSlides';
import type { OnboardingSlide } from '../../../onboardingSlides';

/** Horizontal pager state: current page, scroll position and navigation. */
export function useOnboardingPager() {
  const { width } = useWindowDimensions();
  const listRef = useRef<FlatList<OnboardingSlide>>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);

  const goTo = (target: number) => {
    listRef.current?.scrollToOffset({ offset: target * width, animated: true });
    setIndex(target);
  };

  const handleMomentumEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    setIndex(Math.round(event.nativeEvent.contentOffset.x / width));
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false },
  );

  return {
    width,
    listRef,
    scrollX,
    index,
    isLast: index === ONBOARDING_SLIDES.length - 1,
    goTo,
    handleMomentumEnd,
    handleScroll,
  };
}
