import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useReducedMotion } from '../../motion';

const PULSE_DURATION = 700;
const PULSE_LOW_OPACITY = 0.45;

/** Looping opacity pulse; stays at full opacity under reduced motion. */
export function usePulseAnimation(): Animated.Value {
  const reducedMotion = useReducedMotion();
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (reducedMotion) {
      pulse.setValue(1);
      return undefined;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: PULSE_LOW_OPACITY,
          duration: PULSE_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: PULSE_DURATION,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse, reducedMotion]);

  return pulse;
}
