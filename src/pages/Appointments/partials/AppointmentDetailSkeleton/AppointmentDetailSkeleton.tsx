import { View } from 'react-native';
import { Skeleton, SkeletonGroup } from '@components/feedback';
import { Card } from '@components/surfaces';
import { useTheme } from '@styles/theme';
import { styles } from './AppointmentDetailSkeleton.styles';

export function AppointmentDetailSkeleton() {
  const theme = useTheme();
  return (
    <SkeletonGroup testID="appointment-detail-skeleton">
      <Card>
        <View style={styles.header}>
          <Skeleton width={64} height={64} radius={theme.radius.md} />
          <View style={styles.headerText}>
            <Skeleton width="60%" height={18} />
            <Skeleton width="40%" height={14} />
          </View>
        </View>
        <Skeleton width={96} height={24} radius={theme.radius.pill} />
      </Card>
      <Card>
        <View style={styles.lines}>
          <Skeleton width="30%" height={14} />
          <Skeleton height={14} />
          <Skeleton width="85%" height={14} />
          <Skeleton width="60%" height={14} />
        </View>
      </Card>
      <Skeleton height={48} radius={theme.radius.md} />
    </SkeletonGroup>
  );
}
