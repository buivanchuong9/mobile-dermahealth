import { Animated } from 'react-native';
import { useEntranceAnimation } from '../hooks/useEntranceAnimation';
import type { FadeInViewProps } from './FadeInView.types';

/**
 * Entrance transition that plays once when the element mounts. Keep the
 * element mounted across data refreshes so it does not replay.
 */
export function FadeInView({
  children,
  delay = 0,
  variant = 'rise',
  duration = 'normal',
  style,
}: FadeInViewProps) {
  const animatedStyle = useEntranceAnimation({ variant, delay, duration });
  return (
    <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
  );
}
