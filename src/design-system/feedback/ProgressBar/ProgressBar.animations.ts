import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { motion } from '../../tokens';
import { getEasing, useReducedMotion } from '../../motion';

export const clampProgress = (value: number): number =>
  Math.min(1, Math.max(0, value));

/**
 * Horizontal scale (0 to 1) following `value`, animated on the native thread.
 * Pair it with `transformOrigin: 'left'` on the fill.
 */
export function useProgressAnimation(value: number): Animated.Value {
  const reducedMotion = useReducedMotion();
  const progress = useRef(new Animated.Value(clampProgress(value))).current;

  useEffect(() => {
    if (reducedMotion) {
      progress.setValue(clampProgress(value));
      return undefined;
    }
    const animation = Animated.timing(progress, {
      toValue: clampProgress(value),
      duration: motion.duration.slow,
      easing: getEasing('standard'),
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop();
  }, [progress, reducedMotion, value]);

  return progress;
}
