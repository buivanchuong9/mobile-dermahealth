import { View } from 'react-native';
import { Skeleton, SkeletonGroup, SkeletonRow } from '@design-system/feedback';
import { Card } from '@design-system/surfaces';
import { useTheme } from '@design-system/theme';
import { styles } from './JourneySkeleton.styles';

export function JourneySkeleton() {
  const theme = useTheme();
  return (
    <SkeletonGroup testID="journey-skeleton">
      <Card>
        <View style={styles.lines}>
          <Skeleton width="40%" height={14} />
          <Skeleton width="80%" height={22} />
          <Skeleton height={44} radius={theme.radius.md} />
        </View>
      </Card>
      {Array.from({ length: 5 }, (_, index) => (
        <SkeletonRow key={index} leading="circle" lines={2} card={false} />
      ))}
    </SkeletonGroup>
  );
}
