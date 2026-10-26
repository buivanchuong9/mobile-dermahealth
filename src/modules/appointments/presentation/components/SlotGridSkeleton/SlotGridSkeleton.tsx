import { View } from 'react-native';
import { Skeleton, SkeletonGroup } from '@design-system/feedback';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import { styles } from './SlotGridSkeleton.styles';

export function SlotGridSkeleton() {
  const theme = useTheme();
  return (
    <SkeletonGroup
      label={translate('appointments.booking.loadingSlots')}
      testID="slot-grid-skeleton"
    >
      <View style={styles.grid}>
        {Array.from({ length: 6 }, (_, index) => (
          <Skeleton
            key={index}
            width="31%"
            height={48}
            radius={theme.radius.md}
          />
        ))}
      </View>
    </SkeletonGroup>
  );
}
