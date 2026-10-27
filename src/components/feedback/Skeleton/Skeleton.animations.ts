import { useEffect } from 'react';
import { Animated } from 'react-native';
import { useReducedMotion } from '../../motion';
import { motion } from '../../../styles/tokens';

const STATIC_OPACITY = new Animated.Value(1);
const sharedPulse = new Animated.Value(1);
let activeSkeletons = 0;
let loop: Animated.CompositeAnimation | null = null;

function startLoop() {
  loop = Animated.loop(
    Animated.sequence([
      Animated.timing(sharedPulse, {
        toValue: motion.skeleton.lowOpacity,
        duration: motion.skeleton.pulseDuration,
        useNativeDriver: true,
      }),
      Animated.timing(sharedPulse, {
        toValue: 1,
        duration: motion.skeleton.pulseDuration,
        useNativeDriver: true,
      }),
    ]),
  );
  loop.start();
}

/**
 * One looping pulse shared by every mounted skeleton, so a screen full of
 * placeholders runs a single animation that pulses in unison. The loop runs
 * only while a skeleton is mounted; reduced motion gets static placeholders.
 */
export function usePulseAnimation(): Animated.Value {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      return undefined;
    }
    activeSkeletons += 1;
    if (activeSkeletons === 1) {
      startLoop();
    }
    return () => {
      activeSkeletons -= 1;
      if (activeSkeletons === 0) {
        loop?.stop();
        loop = null;
        sharedPulse.setValue(1);
      }
    };
  }, [reducedMotion]);

  return reducedMotion ? STATIC_OPACITY : sharedPulse;
}
