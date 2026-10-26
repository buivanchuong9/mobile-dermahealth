import { View } from 'react-native';
import { StatusBadge } from '@design-system/data-display';
import { Icon, PressableScale, Typography } from '@design-system/primitives';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import {
  formatDayMonth,
  formatTime,
  isSameDay,
} from '@shared/utilities/localDateTime';
import type { NotificationItemProps } from './NotificationItem.types';
import { styles } from './NotificationItem.styles';
import { KIND_ICON } from './NotificationItem.constants';

export function NotificationItem({
  notification,
  now,
  onPress,
}: NotificationItemProps) {
  const theme = useTheme();
  const when = isSameDay(notification.createdAt, now)
    ? formatTime(notification.createdAt)
    : formatDayMonth(notification.createdAt);
  const label = `${
    notification.read ? '' : `${translate('notifications.unread')}. `
  }${translate(`notifications.kind.${notification.kind}`)}. ${
    notification.title
  }. ${notification.body}. ${when}`;

  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={() => onPress(notification)}
      style={[
        styles.row,
        {
          gap: theme.spacing[3],
          padding: theme.spacing[3],
          borderRadius: theme.radius.md,
          backgroundColor: notification.read
            ? theme.colors.surface.primary
            : theme.colors.background.secondary,
          borderColor: notification.read
            ? theme.colors.border.default
            : theme.colors.brand.primary,
        },
      ]}
      testID={`notification-${notification.id}`}
    >
      <View
        style={[
          styles.icon,
          { backgroundColor: theme.colors.feedback.info.background },
        ]}
      >
        <Icon
          name={KIND_ICON[notification.kind]}
          size={20}
          color={theme.colors.feedback.info.foreground}
        />
      </View>
      <View style={styles.text}>
        <View style={[styles.titleRow, { gap: theme.spacing[2] }]}>
          <View style={styles.text}>
            <Typography variant="bodyStrong">{notification.title}</Typography>
          </View>
          <Typography variant="caption" tone="secondary">
            {when}
          </Typography>
        </View>
        <Typography variant="caption" tone="secondary">
          {notification.body}
        </Typography>
        <View
          style={[
            styles.titleRow,
            { gap: theme.spacing[2], marginTop: theme.spacing[1] },
          ]}
        >
          <StatusBadge
            label={translate('notifications.simulatedTag')}
            tone="neutral"
          />
          {notification.read ? null : (
            <StatusBadge
              label={translate('notifications.unread')}
              tone="info"
              icon="bell"
            />
          )}
        </View>
      </View>
    </PressableScale>
  );
}
