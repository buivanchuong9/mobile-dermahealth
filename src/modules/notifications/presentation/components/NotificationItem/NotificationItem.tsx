import { Pressable, StyleSheet, View } from 'react-native';
import { StatusBadge } from '@design-system/data-display';
import { Icon, Typography } from '@design-system/primitives';
import type { IconName } from '@design-system/primitives';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import {
  formatDayMonth,
  formatTime,
  isSameDay,
} from '@shared/utilities/localDateTime';
import type { LocalDateTime } from '@shared/utilities/localDateTime';
import type {
  AppNotification,
  NotificationKind,
} from '../../../domain/entities/Notification';

const KIND_ICON: Record<NotificationKind, IconName> = {
  appointment_reminder: 'calendar-clock',
  queue_update: 'ticket',
  follow_up_reminder: 'history',
  system: 'info',
};

export type NotificationItemProps = {
  readonly notification: AppNotification;
  readonly now: LocalDateTime;
  readonly onPress: (notification: AppNotification) => void;
};

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
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={() => onPress(notification)}
      style={({ pressed }) => [
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
        pressed && styles.pressed,
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
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', borderWidth: 1 },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { flex: 1 },
  titleRow: { flexDirection: 'row', alignItems: 'center' },
  pressed: { opacity: 0.85 },
});
