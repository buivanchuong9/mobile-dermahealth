import type { Animated } from 'react-native';

/** Animate only native-driver compatible properties. */
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
    transform: [
      {
        scaleX: scrollX.interpolate({
          inputRange,
          outputRange: [0.45, 1, 0.45],
          extrapolate: 'clamp',
        }),
      },
    ],
    opacity: scrollX.interpolate({
      inputRange,
      outputRange: [0.3, 1, 0.3],
      extrapolate: 'clamp',
    }),
  };
}
