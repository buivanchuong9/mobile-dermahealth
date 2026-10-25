import { Pressable, StyleSheet, View } from 'react-native';
import { Icon, Typography } from '@design-system/primitives';
import { MIN_TOUCH_TARGET } from '@design-system/accessibility';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import { formatDateWithWeekday } from '@shared/utilities/localDateTime';
import type { LocalDateTime } from '@shared/utilities/localDateTime';

export type WelcomeHeaderProps = {
  readonly name: string;
  readonly now: LocalDateTime;
  readonly unreadCount: number;
  readonly onOpenNotifications: () => void;
};

export function WelcomeHeader({
  name,
  now,
  unreadCount,
  onOpenNotifications,
}: WelcomeHeaderProps) {
  const theme = useTheme();
  return (
    <View style={[styles.row, { gap: theme.spacing[3] }]}>
      <View style={styles.text}>
        <Typography variant="title" accessibilityRole="header">
          {translate('home.greeting', { name })}
        </Typography>
        <Typography variant="caption" tone="secondary">
          {translate('home.today', { date: formatDateWithWeekday(now) })}
        </Typography>
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={
          unreadCount > 0
            ? translate('home.notificationsButtonUnread', {
                count: unreadCount,
              })
            : translate('home.notificationsButton')
        }
        onPress={onOpenNotifications}
        style={[
          styles.bell,
          {
            borderRadius: theme.radius.pill,
            backgroundColor: theme.colors.surface.primary,
            borderColor: theme.colors.border.default,
          },
        ]}
        testID="home-notifications"
      >
        <Icon name="bell" size={22} />
        {unreadCount > 0 ? (
          <View
            style={[
              styles.badge,
              { backgroundColor: theme.colors.status.error },
            ]}
          >
            <Typography variant="caption" tone="onBrand">
              {String(unreadCount)}
            </Typography>
          </View>
        ) : null}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  text: { flex: 1 },
  bell: {
    width: MIN_TOUCH_TARGET,
    height: MIN_TOUCH_TARGET,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
