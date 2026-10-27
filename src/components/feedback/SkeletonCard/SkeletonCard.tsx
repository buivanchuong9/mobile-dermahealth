import { Card } from '../../surfaces';
import { useTheme } from '../../../styles/theme';
import { Skeleton } from '../Skeleton';
import { SkeletonGroup } from '../SkeletonGroup';
import type { SkeletonCardProps } from './SkeletonCard.types';

/** Card-shaped placeholder for a list or summary being loaded. */
export function SkeletonCard({ lines = 3 }: SkeletonCardProps) {
  const theme = useTheme();
  return (
    <Card testID="skeleton-card">
      <SkeletonGroup gap={theme.spacing[2]}>
        <Skeleton width="40%" height={18} />
        {Array.from({ length: lines }, (_, index) => (
          <Skeleton key={index} width={index === lines - 1 ? '70%' : '100%'} />
        ))}
      </SkeletonGroup>
    </Card>
  );
}
