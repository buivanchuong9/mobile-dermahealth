import { StyleSheet, View } from 'react-native';
import { Card } from '@components/surfaces';
import { useTheme } from '@styles/theme';
import { translate } from '@i18n';
import { QueueStat } from './components/QueueStat';
import type { QueueStatsProps } from './QueueStats.types';

export function QueueStats({ snapshot }: QueueStatsProps) {
  const theme = useTheme();
  const finished = snapshot.stage === 'completed';
  return (
    <Card testID="queue-stats">
      <View style={[styles.row, { gap: theme.spacing[2] }]}>
        <QueueStat
          label={translate('queue.currentlyCalled')}
          value={snapshot.currentlyCalledNumber}
        />
        <QueueStat
          label={translate('queue.ahead')}
          value={translate('queue.aheadValue', { count: snapshot.aheadCount })}
        />
        <QueueStat
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

const styles = StyleSheet.create({ row: { flexDirection: 'row' } });
