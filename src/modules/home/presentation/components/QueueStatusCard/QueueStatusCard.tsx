import { Pressable, StyleSheet, View } from 'react-native';
import type { QueueSnapshot } from '@modules/queue';
import { StatusBadge } from '@design-system/data-display';
import { Icon, Typography } from '@design-system/primitives';
import { Card } from '@design-system/surfaces';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';

export type QueueStatusCardProps = {
  readonly queue: QueueSnapshot;
  readonly onPress: () => void;
};

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
    <Pressable
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
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  text: { flex: 1 },
});
