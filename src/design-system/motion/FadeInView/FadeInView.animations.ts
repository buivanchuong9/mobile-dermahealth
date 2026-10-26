import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useTheme } from '../../theme';
import { useReducedMotion } from '../hooks/useReducedMotion';

const RISE_DISTANCE = 8;

/** Opacity and upward-slide style that plays once on mount. */
export function useFadeInAnimation(delay: number) {
  const theme = useTheme();
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
      duration: theme.motion.duration.normal,
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop();
  }, [delay, progress, reducedMotion, theme.motion.duration.normal]);

  return {
    opacity: progress,
    transform: [
      {
        translateY: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [RISE_DISTANCE, 0],
        }),
      },
    ],
  };
}
