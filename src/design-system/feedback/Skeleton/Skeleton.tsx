import { Animated } from 'react-native';
import { useTheme } from '../../theme';
import { usePulseAnimation } from './Skeleton.animations';
import type { SkeletonProps } from './Skeleton.types';

/** Gentle pulse placeholder; static when reduced motion is requested. */
export function Skeleton({ width = '100%', height = 16 }: SkeletonProps) {
  const theme = useTheme();
  const pulse = usePulseAnimation();
  return (
    <Animated.View
      style={{
        width,
        height,
        borderRadius: theme.radius.sm,
        backgroundColor: theme.colors.border.default,
        opacity: pulse,
      }}
    />
  );
}
