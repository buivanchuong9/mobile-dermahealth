import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { StatusBadge } from '@design-system/data-display';
import type { StatusTone } from '@design-system/data-display';
import { useReducedMotion } from '@design-system/motion';
import { Icon, Typography } from '@design-system/primitives';
import type { IconName } from '@design-system/primitives';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import { formatTime } from '@shared/utilities/localDateTime';
import type { QueueSnapshot, QueueStage } from '../../../domain/entities/Queue';

const STAGE_PRESENTATION: Record<
  QueueStage,
  { tone: StatusTone; icon: IconName }
> = {
  waiting: { tone: 'info', icon: 'hourglass' },
  upcoming: { tone: 'warning', icon: 'alarm-clock' },
  called: { tone: 'success', icon: 'door-open' },
  in_consultation: { tone: 'success', icon: 'stethoscope' },
  completed: { tone: 'neutral', icon: 'check' },
};

/** Fades the ticket number slightly whenever the stage changes. */
function useStageFlash(stage: QueueStage) {
  const reducedMotion = useReducedMotion();
  const theme = useTheme();
  const opacity = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (reducedMotion) {
      return undefined;
    }
    opacity.setValue(0.4);
    const animation = Animated.timing(opacity, {
      toValue: 1,
      duration: theme.motion.duration.slow,
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop();
  }, [stage, opacity, reducedMotion, theme.motion.duration.slow]);
  return opacity;
}

export function TicketHeroCard({
  snapshot,
}: {
  readonly snapshot: QueueSnapshot;
}) {
  const theme = useTheme();
  const opacity = useStageFlash(snapshot.stage);
  const { tone, icon } = STAGE_PRESENTATION[snapshot.stage];

  return (
    <View
      accessible
      accessibilityLabel={`${translate('queue.yourTicket')} ${
        snapshot.ticket.number
      }. ${translate(`queue.stage.${snapshot.stage}`)}`}
      style={[
        styles.card,
        {
          padding: theme.spacing[5],
          gap: theme.spacing[3],
          borderRadius: theme.radius.xl,
          backgroundColor: theme.colors.brand.primaryDark,
        },
      ]}
      testID="queue-ticket"
    >
      <Typography variant="caption" tone="onBrand">
        {translate('queue.yourTicket')}
      </Typography>
      <Animated.Text
        style={[styles.number, { color: theme.colors.text.onBrand, opacity }]}
      >
        {snapshot.ticket.number}
      </Animated.Text>
      <StatusBadge
        label={translate(`queue.stage.${snapshot.stage}`)}
        tone={tone}
        icon={icon}
        testID="queue-stage"
      />
      <View style={{ gap: theme.spacing[1] }}>
        <View style={[styles.row, { gap: theme.spacing[2] }]}>
          <Icon name="building-2" size={16} color={theme.colors.text.onBrand} />
          <Typography variant="caption" tone="onBrand">
            {snapshot.ticket.clinicName}
          </Typography>
        </View>
        <View style={[styles.row, { gap: theme.spacing[2] }]}>
          <Icon name="door-open" size={16} color={theme.colors.text.onBrand} />
          <Typography variant="caption" tone="onBrand">
            {snapshot.ticket.department} · {snapshot.ticket.room}
          </Typography>
        </View>
        <View style={[styles.row, { gap: theme.spacing[2] }]}>
          <Icon name="clock" size={16} color={theme.colors.text.onBrand} />
          <Typography variant="caption" tone="onBrand">
            {translate('queue.lastUpdated', {
              time: formatTime(snapshot.lastUpdatedAt),
            })}
          </Typography>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { alignItems: 'flex-start' },
  number: { fontSize: 56, lineHeight: 64, fontWeight: '700' },
  row: { flexDirection: 'row', alignItems: 'center' },
});
