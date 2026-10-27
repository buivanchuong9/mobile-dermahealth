import type { Animated } from 'react-native';
import { ACTIVE_WIDTH, DOT } from './PageDots.constants';

/** Width and opacity of dot `index` as the pager scrolls horizontally. */
export function getDotAnimatedStyle(
  scrollX: Animated.Value,
  pageWidth: number,
  index: number,
) {
  const inputRange = [
    (index - 1) * pageWidth,
    index * pageWidth,
    (index + 1) * pageWidth,
  ];
  return {
    width: scrollX.interpolate({
      inputRange,
      outputRange: [DOT, ACTIVE_WIDTH, DOT],
      extrapolate: 'clamp',
    }),
    opacity: scrollX.interpolate({
      inputRange,
      outputRange: [0.3, 1, 0.3],
      extrapolate: 'clamp',
    }),
  };
}
