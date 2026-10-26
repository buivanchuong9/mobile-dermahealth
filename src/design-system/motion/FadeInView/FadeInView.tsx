import { Animated } from 'react-native';
import { useFadeInAnimation } from './FadeInView.animations';
import type { FadeInViewProps } from './FadeInView.types';

/** Entrance transition: fades in while rising a few pixels. */
export function FadeInView({ children, delay = 0, style }: FadeInViewProps) {
  const animatedStyle = useFadeInAnimation(delay);
  return (
    <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
  );
}
