import { View } from 'react-native';
import { Skeleton, SkeletonGroup, SkeletonRow } from '@components/feedback';
import { Card } from '@components/surfaces';
import { useTheme } from '@styles/theme';
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
