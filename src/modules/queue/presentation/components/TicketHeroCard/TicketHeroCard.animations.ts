import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useReducedMotion } from '@design-system/motion';
import { useTheme } from '@design-system/theme';
import type { QueueStage } from '../../../domain/entities/Queue';

const FLASH_START_OPACITY = 0.4;

/** Opacity that dips and recovers whenever the queue stage changes. */
export function useStageFlash(stage: QueueStage): Animated.Value {
  const reducedMotion = useReducedMotion();
  const theme = useTheme();
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (reducedMotion) {
      return undefined;
    }
    opacity.setValue(FLASH_START_OPACITY);
    const animation = Animated.timing(opacity, {
      toValue: 1,
      duration: theme.motion.duration.slow,
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop();
  }, [stage, opacity, reducedMotion, theme.motion.duration.slow]);

  return opacity;
}
