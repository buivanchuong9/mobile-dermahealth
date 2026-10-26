import { useCallback } from 'react';
import { LayoutAnimation } from 'react-native';
import { motion } from '../../tokens';
import { useReducedMotion } from './useReducedMotion';

/**
 * Returns a function that smooths the next layout change (a message appearing,
 * a section expanding) instead of letting content jump. Call it right before
 * the state update; it does nothing under reduced motion.
 */
export function useLayoutTransition(): () => void {
  const reducedMotion = useReducedMotion();
  return useCallback(() => {
    if (reducedMotion) {
      return;
    }
    LayoutAnimation.configureNext({
      duration: motion.duration.normal,
      update: { type: LayoutAnimation.Types.easeInEaseOut },
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      delete: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
    });
  }, [reducedMotion]);
}
