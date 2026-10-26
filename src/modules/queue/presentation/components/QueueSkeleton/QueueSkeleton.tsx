import { View } from 'react-native';
import { Skeleton, SkeletonGroup, SkeletonRow } from '@design-system/feedback';
import { Card } from '@design-system/surfaces';
import { useTheme } from '@design-system/theme';
import { styles } from './QueueSkeleton.styles';

export function QueueSkeleton() {
  const theme = useTheme();
  return (
    <SkeletonGroup testID="queue-skeleton">
      <Card>
        <View style={styles.hero}>
          <Skeleton width={120} height={14} />
          <Skeleton width={150} height={56} radius={theme.radius.md} />
          <Skeleton width={110} height={24} radius={theme.radius.pill} />
        </View>
      </Card>
      <View style={styles.stats}>
        <Skeleton width="31%" height={72} radius={theme.radius.md} />
        <Skeleton width="31%" height={72} radius={theme.radius.md} />
        <Skeleton width="31%" height={72} radius={theme.radius.md} />
      </View>
      <SkeletonRow leading="none" lines={3} />
    </SkeletonGroup>
  );
}
