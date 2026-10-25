import { StyleSheet, View } from 'react-native';
import { Card } from '@design-system/surfaces';
import { Typography } from '@design-system/primitives';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import type { QueueSnapshot } from '../../../domain/entities/Queue';

function Stat({
  label,
  value,
}: {
  readonly label: string;
  readonly value: string;
}) {
  return (
    <View
      accessible
      accessibilityLabel={`${label}: ${value}`}
      style={styles.stat}
    >
      <Typography variant="caption" tone="secondary" align="center">
        {label}
      </Typography>
      <Typography variant="subtitle" align="center">
        {value}
      </Typography>
    </View>
  );
}

export function QueueStats({ snapshot }: { readonly snapshot: QueueSnapshot }) {
  const theme = useTheme();
  const finished = snapshot.stage === 'completed';
  return (
    <Card testID="queue-stats">
      <View style={[styles.row, { gap: theme.spacing[2] }]}>
        <Stat
          label={translate('queue.currentlyCalled')}
          value={snapshot.currentlyCalledNumber}
        />
        <Stat
          label={translate('queue.ahead')}
          value={translate('queue.aheadValue', { count: snapshot.aheadCount })}
        />
        <Stat
          label={translate('queue.eta')}
          value={
            finished
              ? '–'
              : translate('queue.etaValue', {
                  minutes: snapshot.estimatedWaitMinutes,
                })
          }
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  stat: { flex: 1, gap: 4 },
});
