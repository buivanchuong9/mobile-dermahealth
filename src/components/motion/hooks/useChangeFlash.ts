import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { motion } from '../../../styles/tokens';
import { getEasing } from '../getEasing';
import { useReducedMotion } from './useReducedMotion';

const START_OPACITY = 0.35;
const START_OFFSET = 4;

/**
 * Brief dip-and-settle when `value` changes after mount, so a changed figure
 * is noticed without animating every render. Static under reduced motion.
 */
export function useChangeFlash(value: string | number) {
  const reducedMotion = useReducedMotion();
  const progress = useRef(new Animated.Value(1)).current;
  const previous = useRef(value);

  useEffect(() => {
    if (previous.current === value) {
      return undefined;
    }
    previous.current = value;
    if (reducedMotion) {
      return undefined;
    }
    progress.setValue(0);
    const animation = Animated.timing(progress, {
      toValue: 1,
      duration: motion.duration.slow,
      easing: getEasing('enter'),
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop();
  }, [progress, reducedMotion, value]);

  return {
    opacity: progress.interpolate({
      inputRange: [0, 1],
      outputRange: [START_OPACITY, 1],
    }),
    transform: [
      {
        translateY: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [START_OFFSET, 0],
        }),
      },
    ],
  };
}
