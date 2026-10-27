import { View } from 'react-native';
import { Skeleton, SkeletonGroup, SkeletonRow } from '@components/feedback';
import { Card } from '@components/surfaces';
import { styles } from './RecordDetailSkeleton.styles';

export function RecordDetailSkeleton() {
  return (
    <SkeletonGroup testID="record-detail-skeleton">
      <Card>
        <View style={styles.lines}>
          <Skeleton width="30%" height={14} />
          <Skeleton width="75%" height={22} />
          <Skeleton width="50%" height={14} />
        </View>
      </Card>
      <Card>
        <View style={styles.lines}>
          <Skeleton width="35%" height={16} />
          <Skeleton height={14} />
          <Skeleton height={14} />
          <Skeleton width="70%" height={14} />
        </View>
      </Card>
      <SkeletonRow leading="square" lines={2} />
    </SkeletonGroup>
  );
}
