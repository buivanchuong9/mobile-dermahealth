import { View } from 'react-native';
import { Skeleton, SkeletonGroup } from '@design-system/feedback';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import { styles } from './ChatMessagesSkeleton.styles';

export function ChatMessagesSkeleton() {
  const theme = useTheme();
  return (
    <SkeletonGroup
      label={translate('chat.loadingMessages')}
      testID="chat-skeleton"
    >
      <View style={styles.incoming}>
        <Skeleton width="62%" height={52} radius={theme.radius.lg} />
      </View>
      <View style={styles.outgoing}>
        <Skeleton width="48%" height={40} radius={theme.radius.lg} />
      </View>
      <View style={styles.incoming}>
        <Skeleton width="70%" height={68} radius={theme.radius.lg} />
      </View>
    </SkeletonGroup>
  );
}
