import { View } from 'react-native';
import { FadeInView, staggerDelay } from '@components/motion';
import { Icon, PressableScale, Typography } from '@components/primitives';
import type { IconName } from '@components/primitives';
import { useTheme } from '@styles/theme';
import { translate } from '@i18n';
import type { QuickActionsProps } from './QuickActions.types';
import { styles } from './QuickActions.styles';

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
    <FadeInView
      delay={staggerDelay(2)}
      style={{ gap: theme.spacing[2] }}
      testID="home-quick-actions"
    >
      <Typography variant="subtitle" accessibilityRole="header">
        {translate('home.quickActions.title')}
      </Typography>
      <View
        style={[
          styles.grid,
          {
            padding: theme.spacing[2],
            borderRadius: theme.radius.lg,
            borderColor: theme.colors.border.default,
            backgroundColor: theme.colors.surface.primary,
          },
        ]}
      >
        {items.map(item => (
          <PressableScale
            key={item.key}
            accessibilityRole="button"
            accessibilityLabel={translate(`home.quickActions.${item.key}`)}
            onPress={item.onPress}
            style={[
              styles.tile,
              {
                paddingVertical: theme.spacing[3],
                paddingHorizontal: theme.spacing[1],
                gap: theme.spacing[2],
                borderRadius: theme.radius.md,
              },
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
          </PressableScale>
        ))}
      </View>
    </FadeInView>
  );
}
