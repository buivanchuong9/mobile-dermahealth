import { StyleSheet, View } from 'react-native';
import { StatusBadge } from '@design-system/data-display';
import { Icon, PressableScale, Typography } from '@design-system/primitives';
import { Card } from '@design-system/surfaces';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import type { QueueStatusCardProps } from './QueueStatusCard.types';

export function QueueStatusCard({ queue, onPress }: QueueStatusCardProps) {
  const theme = useTheme();
  const finished = queue.stage === 'completed';
  const summary = finished
    ? translate('home.queue.summaryDone')
    : translate('home.queue.summary', {
        ahead: queue.aheadCount,
        minutes: queue.estimatedWaitMinutes,
      });
  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel={`${translate('home.queue.title')} ${
        queue.ticket.number
      }. ${translate(`queue.stage.${queue.stage}`)}. ${summary}`}
      onPress={onPress}
      testID="home-queue"
    >
      <Card>
        <View style={[styles.row, { gap: theme.spacing[3] }]}>
          <View style={styles.text}>
            <Typography variant="caption" tone="secondary">
              {translate('home.queue.title')}
            </Typography>
            <Typography variant="display">{queue.ticket.number}</Typography>
          </View>
          <Icon name="chevron-right" color={theme.colors.text.secondary} />
        </View>
        <StatusBadge
          label={translate(`queue.stage.${queue.stage}`)}
          tone={
            queue.stage === 'called' || queue.stage === 'in_consultation'
              ? 'success'
              : queue.stage === 'upcoming'
              ? 'warning'
              : 'info'
          }
          icon="ticket"
        />
        <Typography variant="caption" tone="secondary">
          {summary}
        </Typography>
      </Card>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  text: { flex: 1 },
});
