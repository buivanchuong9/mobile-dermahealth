import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useReducedMotion } from '../../motion';
import { useTheme } from '../../theme';

export const clampProgress = (value: number): number =>
  Math.min(1, Math.max(0, value));

/** Animated fill width (a percentage string) following `value`. */
export function useProgressAnimation(value: number) {
  const theme = useTheme();
  const reducedMotion = useReducedMotion();
  const progress = useRef(new Animated.Value(clampProgress(value))).current;

  useEffect(() => {
    if (reducedMotion) {
      progress.setValue(clampProgress(value));
      return undefined;
    }
    const animation = Animated.timing(progress, {
      toValue: clampProgress(value),
      duration: theme.motion.duration.normal,
      useNativeDriver: false,
    });
    animation.start();
    return () => animation.stop();
  }, [progress, reducedMotion, theme.motion.duration.normal, value]);

  return progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });
}
