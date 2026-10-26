import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useReducedMotion } from '../../motion';
import { useTheme } from '../../theme';

const START_SCALE = 0.8;

/** Fade and scale-in style that plays once; static under reduced motion. */
export function useScaleInAnimation() {
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
      duration: theme.motion.duration.slow,
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop();
  }, [progress, reducedMotion, theme.motion.duration.slow]);

  return {
    opacity: progress,
    transform: [
      {
        scale: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [START_SCALE, 1],
        }),
      },
    ],
  };
}
