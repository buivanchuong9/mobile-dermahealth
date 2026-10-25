import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import type { ReactNode } from 'react';
import { useTheme } from '../theme';
import { useReducedMotion } from './useReducedMotion';

export type FadeInViewProps = {
  readonly children: ReactNode;
  /** Milliseconds to wait before starting; use small steps for staggering. */
  readonly delay?: number;
  readonly style?: StyleProp<ViewStyle>;
};

const RISE_DISTANCE = 8;

/** Entrance transition: fades in while rising a few pixels. */
export function FadeInView({ children, delay = 0, style }: FadeInViewProps) {
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

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: progress,
          transform: [
            {
              translateY: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [RISE_DISTANCE, 0],
              }),
            },
          ],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}
