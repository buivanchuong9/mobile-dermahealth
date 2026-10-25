import { Pressable, StyleSheet, View } from 'react-native';
import { Icon, Typography } from '@design-system/primitives';
import type { IconName } from '@design-system/primitives';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import type { HomeActions } from '../../types';

export type QuickActionsProps = { readonly actions: HomeActions };

export function QuickActions({ actions }: QuickActionsProps) {
  const theme = useTheme();
  const items: readonly {
    readonly key: 'book' | 'followUp' | 'assessment' | 'records' | 'chat';
    readonly icon: IconName;
    readonly onPress: () => void;
  }[] = [
    { key: 'book', icon: 'calendar-days', onPress: actions.onBookAppointment },
    { key: 'followUp', icon: 'history', onPress: actions.onBookFollowUp },
    { key: 'assessment', icon: 'scan-face', onPress: actions.onOpenAssessment },
    { key: 'records', icon: 'file-text', onPress: actions.onOpenRecords },
    { key: 'chat', icon: 'message-circle', onPress: actions.onOpenChat },
  ];

  return (
    <View style={{ gap: theme.spacing[2] }} testID="home-quick-actions">
      <Typography variant="subtitle" accessibilityRole="header">
        {translate('home.quickActions.title')}
      </Typography>
      <View style={[styles.grid, { gap: theme.spacing[2] }]}>
        {items.map(item => (
          <Pressable
            key={item.key}
            accessibilityRole="button"
            accessibilityLabel={translate(`home.quickActions.${item.key}`)}
            onPress={item.onPress}
            style={({ pressed }) => [
              styles.tile,
              {
                padding: theme.spacing[2],
                gap: theme.spacing[2],
                borderRadius: theme.radius.lg,
                borderColor: theme.colors.border.default,
                backgroundColor: theme.colors.surface.primary,
              },
              pressed && styles.pressed,
            ]}
            testID={`quick-${item.key}`}
          >
            <View
              style={[
                styles.circle,
                { backgroundColor: theme.colors.feedback.info.background },
              ]}
            >
              <Icon
                name={item.icon}
                size={22}
                color={theme.colors.feedback.info.foreground}
              />
            </View>
            <Typography variant="caption" align="center">
              {translate(`home.quickActions.${item.key}`)}
            </Typography>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  tile: { width: '31.5%', alignItems: 'center', borderWidth: 1 },
  circle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.85 },
});
