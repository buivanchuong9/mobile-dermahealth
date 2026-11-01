import { StyleSheet, View } from 'react-native';
import { FadeInView, staggerDelay } from '@components/motion';
import { Icon, PressableScale, Typography } from '@components/primitives';
import type { IconName } from '@components/primitives';
import { useTheme } from '@styles/theme';
import { translate } from '@i18n';
import type { HomeActions } from '../../types';

export function CareJourney({ actions }: { readonly actions: HomeActions }) {
  const theme = useTheme();
  const steps: {
    key: 'book' | 'visit' | 'follow' | 'record';
    icon: IconName;
    onPress: () => void;
  }[] = [
    { key: 'book', icon: 'calendar-days', onPress: actions.onBookAppointment },
    { key: 'visit', icon: 'calendar', onPress: actions.onOpenAppointments },
    { key: 'follow', icon: 'ticket', onPress: actions.onOpenQueue },
    { key: 'record', icon: 'file-text', onPress: actions.onOpenRecords },
  ];
  return (
    <FadeInView delay={staggerDelay(1)} style={{ gap: theme.spacing[2] }}>
      <Typography variant="subtitle" accessibilityRole="header">
        {translate('home.journey.title')}
      </Typography>
      <Typography variant="caption" tone="secondary">
        {translate('home.journey.subtitle')}
      </Typography>
      <View
        style={[
          styles.panel,
          {
            backgroundColor: theme.colors.surface.primary,
            borderColor: theme.colors.border.default,
            borderRadius: theme.radius.lg,
          },
        ]}
      >
        {steps.map((step, index) => (
          <PressableScale
            key={step.key}
            accessibilityRole="button"
            accessibilityLabel={translate(`home.journey.${step.key}.title`)}
            onPress={step.onPress}
            style={[
              styles.row,
              index > 0 && {
                borderTopWidth: StyleSheet.hairlineWidth,
                borderTopColor: theme.colors.border.default,
              },
            ]}
          >
            <View
              style={[
                styles.icon,
                { backgroundColor: theme.colors.feedback.info.background },
              ]}
            >
              <Icon
                name={step.icon}
                size={21}
                color={theme.colors.feedback.info.foreground}
              />
            </View>
            <View style={styles.content}>
              <Typography variant="bodyStrong">
                {translate(`home.journey.${step.key}.title`)}
              </Typography>
              <Typography variant="caption" tone="secondary">
                {translate(`home.journey.${step.key}.description`)}
              </Typography>
            </View>
            <Icon
              name="chevron-right"
              size={19}
              color={theme.colors.text.secondary}
            />
          </PressableScale>
        ))}
      </View>
    </FadeInView>
  );
}
const styles = StyleSheet.create({
  panel: { borderWidth: 1, overflow: 'hidden' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    minHeight: 68,
  },
  icon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { flex: 1, gap: 2 },
});
