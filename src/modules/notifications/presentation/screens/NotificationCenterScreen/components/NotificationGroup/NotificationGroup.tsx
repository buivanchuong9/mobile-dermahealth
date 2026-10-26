import { View } from 'react-native';
import { FadeInView } from '@design-system/motion';
import { Typography } from '@design-system/primitives';
import { useTheme } from '@design-system/theme';
import { NotificationItem } from '../../../../components/NotificationItem';
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
        <FadeInView key={notification.id} delay={index * 50}>
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
