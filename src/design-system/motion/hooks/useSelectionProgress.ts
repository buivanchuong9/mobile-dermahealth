import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { motion } from '../../tokens';
import { getEasing } from '../getEasing';
import { useReducedMotion } from './useReducedMotion';

/**
 * 0 when unselected, 1 when selected, eased between. Drives color mixes, so it
 * uses the JS driver; use it only on elements that change on user input.
 */
export function useSelectionProgress(selected: boolean) {
  const reducedMotion = useReducedMotion();
  const progress = useRef(new Animated.Value(selected ? 1 : 0)).current;

  useEffect(() => {
    if (reducedMotion) {
      progress.setValue(selected ? 1 : 0);
      return undefined;
    }
    const animation = Animated.timing(progress, {
      toValue: selected ? 1 : 0,
      duration: motion.duration.fast,
      easing: getEasing('standard'),
      useNativeDriver: false,
    });
    animation.start();
    return () => animation.stop();
  }, [progress, reducedMotion, selected]);

  /** Color that blends from `unselected` to `selected` with the progress. */
  const mix = (unselected: string, selectedColor: string) =>
    progress.interpolate({
      inputRange: [0, 1],
      outputRange: [unselected, selectedColor],
    });

  return { progress, mix };
}
