import { useEffect, useRef, useState } from 'react';
import { Animated, useWindowDimensions } from 'react-native';
import type {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { ONBOARDING_SLIDES } from '../../onboardingSlides';
import type { OnboardingSlide } from '../../onboardingSlides';
import { useReducedMotion } from '@components/motion';

/** Horizontal pager state: current page, scroll position and navigation. */
export function useOnboardingPager() {
  const { width } = useWindowDimensions();
  const listRef = useRef<FlatList<OnboardingSlide>>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    listRef.current?.scrollToOffset({ offset: index * width, animated: false });
    // Keep the visible page anchored when the window width changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  const goTo = (target: number) => {
    const safeTarget = Math.max(
      0,
      Math.min(target, ONBOARDING_SLIDES.length - 1),
    );
    listRef.current?.scrollToOffset({
      offset: safeTarget * width,
      animated: !reducedMotion,
    });
    setIndex(safeTarget);
  };

  const handleMomentumEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    setIndex(Math.round(event.nativeEvent.contentOffset.x / width));
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: true },
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
