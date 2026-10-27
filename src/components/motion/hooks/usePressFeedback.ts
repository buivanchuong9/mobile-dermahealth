import { useCallback, useRef } from 'react';
import { Animated } from 'react-native';
import { motion } from '../../../styles/tokens';
import { useReducedMotion } from './useReducedMotion';

export type PressFeedbackOptions = {
  readonly scale?: number;
  /** Opacity while pressed; the platform ripple can replace it on Android. */
  readonly pressedOpacity?: number;
  /** Opacity at rest, so a dimmed (disabled) element keeps its dimming. */
  readonly restOpacity?: number;
  readonly disabled?: boolean;
};

/**
 * Spring-based press feedback on the native thread. Scale is skipped under
 * reduced motion; the opacity change remains as a non-motion cue.
 */
export function usePressFeedback({
  scale = motion.press.scale,
  pressedOpacity = motion.press.opacity,
  restOpacity = 1,
  disabled = false,
}: PressFeedbackOptions = {}) {
  const reducedMotion = useReducedMotion();
  const pressed = useRef(new Animated.Value(0)).current;

  const animateTo = useCallback(
    (toValue: 0 | 1) => {
      if (disabled) {
        return;
      }
      Animated.spring(pressed, {
        toValue,
        ...motion.spring.press,
        useNativeDriver: true,
      }).start();
    },
    [disabled, pressed],
  );

  const style = {
    opacity: pressed.interpolate({
      inputRange: [0, 1],
      outputRange: [restOpacity, restOpacity * pressedOpacity],
    }),
    transform: [
      {
        scale: pressed.interpolate({
          inputRange: [0, 1],
          outputRange: [1, reducedMotion ? 1 : scale],
        }),
      },
    ],
  };

  return {
    style,
    onPressIn: () => animateTo(1),
    onPressOut: () => animateTo(0),
  };
}
