import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { motion } from '../../../styles/tokens';
import type { MotionDuration } from '../../../styles/tokens';
import { getEasing } from '../getEasing';
import { useReducedMotion } from './useReducedMotion';

export type EntranceVariant = 'fade' | 'rise' | 'scale';

export type EntranceOptions = {
  readonly variant?: EntranceVariant;
  /** Milliseconds to wait before starting (see `staggerDelay`). */
  readonly delay?: number;
  readonly duration?: MotionDuration;
};

/**
 * Style for an element arriving on screen. Plays once when the component
 * mounts (never on re-render), runs on the native thread and is static under
 * reduced motion.
 */
export function useEntranceAnimation({
  variant = 'rise',
  delay = 0,
  duration = 'normal',
}: EntranceOptions = {}) {
  const reducedMotion = useReducedMotion();
  const progress = useRef(new Animated.Value(reducedMotion ? 1 : 0)).current;

  useEffect(() => {
    if (reducedMotion) {
      progress.setValue(1);
      return undefined;
    }
    const animation = Animated.timing(progress, {
      toValue: 1,
      delay,
      duration: motion.duration[duration],
      easing: getEasing('enter'),
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop();
  }, [delay, duration, progress, reducedMotion]);

  if (variant === 'fade') {
    return { opacity: progress };
  }
  if (variant === 'scale') {
    return {
      opacity: progress,
      transform: [
        {
          scale: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [motion.entrance.scaleFrom, 1],
          }),
        },
      ],
    };
  }
  return {
    opacity: progress,
    transform: [
      {
        translateY: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [motion.entrance.distance, 0],
        }),
      },
    ],
  };
}
