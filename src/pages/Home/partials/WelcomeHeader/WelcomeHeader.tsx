import { View } from 'react-native';
import { Icon, PressableScale, Typography } from '@components/primitives';
import { useTheme } from '@styles/theme';
import { translate } from '@i18n';
import { formatDateWithWeekday } from '@utils/localDateTime';
import type { WelcomeHeaderProps } from './WelcomeHeader.types';
import { styles } from './WelcomeHeader.styles';

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
      <PressableScale
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
      </PressableScale>
    </View>
  );
}
