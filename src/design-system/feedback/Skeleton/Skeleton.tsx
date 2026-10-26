import { Animated } from 'react-native';
import { useTheme } from '../../theme';
import { usePulseAnimation } from './Skeleton.animations';
import type { SkeletonProps } from './Skeleton.types';

/** Placeholder block; pulses in unison with its siblings, static if reduced. */
export function Skeleton({
  width = '100%',
  height = 16,
  radius,
  circle = false,
}: SkeletonProps) {
  const theme = useTheme();
  const pulse = usePulseAnimation();
  return (
    <Animated.View
      importantForAccessibility="no-hide-descendants"
      accessibilityElementsHidden
      style={{
        width: circle ? height : width,
        height,
        borderRadius: circle ? height / 2 : radius ?? theme.radius.sm,
        backgroundColor: theme.colors.border.default,
        opacity: pulse,
      }}
    />
  );
}
