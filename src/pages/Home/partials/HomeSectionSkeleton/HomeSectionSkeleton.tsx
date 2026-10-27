import { View } from 'react-native';
import { Skeleton, SkeletonGroup, SkeletonRow } from '@components/feedback';
import { Card } from '@components/surfaces';
import { useTheme } from '@styles/theme';
import type { HomeSectionSkeletonProps } from './HomeSectionSkeleton.types';

/** Placeholders shaped like each dashboard section, so layout does not jump. */
export function HomeSectionSkeleton({ variant }: HomeSectionSkeletonProps) {
  const theme = useTheme();
  const gap = theme.spacing[2];

  if (variant === 'nextStep') {
    return (
      <SkeletonGroup testID="home-skeleton-next-step">
        <Card>
          <View style={{ gap }}>
            <Skeleton width="35%" height={14} />
            <Skeleton width="70%" height={22} />
            <Skeleton width="90%" height={14} />
            <Skeleton height={44} radius={theme.radius.md} />
          </View>
        </Card>
      </SkeletonGroup>
    );
  }
  if (variant === 'queue') {
    return (
      <SkeletonGroup>
        <SkeletonRow leading="none" lines={2} trailing />
      </SkeletonGroup>
    );
  }
  if (variant === 'appointments') {
    return (
      <SkeletonGroup testID="home-skeleton-appointments">
        <Skeleton width="45%" height={18} />
        <SkeletonRow leading="square" lines={3} trailing />
      </SkeletonGroup>
    );
  }
  if (variant === 'reminders') {
    return (
      <SkeletonGroup>
        <Skeleton width="40%" height={18} />
        <SkeletonRow lines={2} />
      </SkeletonGroup>
    );
  }
  return (
    <SkeletonGroup>
      <Skeleton width="40%" height={18} />
      <SkeletonRow leading="square" lines={2} />
      <SkeletonRow leading="square" lines={2} />
    </SkeletonGroup>
  );
}
