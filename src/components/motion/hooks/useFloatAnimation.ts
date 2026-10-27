import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { motion } from '../../../styles/tokens';
import { getEasing } from '../getEasing';
import { useReducedMotion } from './useReducedMotion';

/**
 * Slow, small vertical drift for decorative illustrations only. Native
 * driver, stops on unmount, and does not move at all under reduced motion.
 */
export function useFloatAnimation() {
  const reducedMotion = useReducedMotion();
  const drift = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (reducedMotion) {
      drift.setValue(0);
      return undefined;
    }
    const ease = getEasing('standard');
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(drift, {
          toValue: 1,
          duration: motion.float.duration,
          easing: ease,
          useNativeDriver: true,
        }),
        Animated.timing(drift, {
          toValue: 0,
          duration: motion.float.duration,
          easing: ease,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [drift, reducedMotion]);

  return {
    transform: [
      {
        translateY: drift.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -motion.float.distance],
        }),
      },
    ],
  };
}
