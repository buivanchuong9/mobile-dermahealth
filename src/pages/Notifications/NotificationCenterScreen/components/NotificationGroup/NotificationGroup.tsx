import { View } from 'react-native';
import { FadeInView, staggerDelay } from '@components/motion';
import { Typography } from '@components/primitives';
import { useTheme } from '@styles/theme';
import { NotificationItem } from '../../../partials/NotificationItem';
import type { NotificationGroupProps } from './NotificationGroup.types';

/** A dated section ("Hôm nay", "Trước đó"); hidden when empty. */
export function NotificationGroup({
  title,
  notifications,
  now,
  onPress,
}: NotificationGroupProps) {
  const theme = useTheme();
  if (notifications.length === 0) {
    return null;
  }
  return (
    <View style={{ gap: theme.spacing[2] }}>
      <Typography variant="caption" tone="secondary" accessibilityRole="header">
        {title}
      </Typography>
      {notifications.map((notification, index) => (
        <FadeInView key={notification.id} delay={staggerDelay(index)}>
          <NotificationItem
            notification={notification}
            now={now}
            onPress={onPress}
          />
        </FadeInView>
      ))}
    </View>
  );
}
