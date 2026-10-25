import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { translate } from '@shared/localization';
import { useReducedMotion } from '../../motion';
import { useTheme } from '../../theme';
import { Card } from '../../surfaces';

export type SkeletonProps = {
  readonly width?: number | `${number}%`;
  readonly height?: number;
};

/** Gentle pulse placeholder; static when reduced motion is requested. */
export function Skeleton({ width = '100%', height = 16 }: SkeletonProps) {
  const theme = useTheme();
  const reducedMotion = useReducedMotion();
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (reducedMotion) {
      pulse.setValue(1);
      return undefined;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 0.45,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse, reducedMotion]);

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

/** Card-shaped placeholder for a list or summary being loaded. */
export function SkeletonCard({ lines = 3 }: { readonly lines?: number }) {
  const theme = useTheme();
  return (
    <Card testID="skeleton-card">
      <Animated.View
        accessible
        accessibilityRole="progressbar"
        accessibilityLabel={translate('common.loadingContent')}
        style={{ gap: theme.spacing[2] }}
      >
        <Skeleton width="40%" height={18} />
        {Array.from({ length: lines }, (_, index) => (
          <Skeleton key={index} width={index === lines - 1 ? '70%' : '100%'} />
        ))}
      </Animated.View>
    </Card>
  );
}
