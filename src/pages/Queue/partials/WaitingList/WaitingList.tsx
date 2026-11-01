import { StyleSheet, View } from 'react-native';
import { Typography } from '@components/primitives';
import { Card } from '@components/surfaces';
import { useTheme } from '@styles/theme';
import { translate } from '@i18n';
import type { QueueSnapshot } from '../../../../model/queue/Queue';

export function WaitingList({
  snapshot,
}: {
  readonly snapshot: QueueSnapshot;
}) {
  const theme = useTheme();
  return (
    <Card testID="queue-waiting-list">
      <View style={styles.heading}>
        <Typography variant="subtitle" accessibilityRole="header">
          {translate('queue.waitingList.title')}
        </Typography>
        <Typography variant="caption" tone="secondary">
          {translate('queue.aheadValue', { count: snapshot.aheadCount })}
        </Typography>
      </View>
      <Typography variant="caption" tone="secondary">
        {translate('queue.waitingList.simulated')}
      </Typography>
      {snapshot.waitingNumbers.length === 0 ? (
        <Typography>
          {translate(
            snapshot.stage === 'waiting' || snapshot.stage === 'upcoming'
              ? 'queue.waitingList.next'
              : 'queue.waitingList.none',
          )}
        </Typography>
      ) : (
        <View style={styles.list}>
          {snapshot.waitingNumbers.map((number, index) => (
            <View
              key={number}
              accessible
              accessibilityLabel={translate('queue.waitingList.item', {
                position: index + 1,
                number,
              })}
              style={[
                styles.item,
                { borderTopColor: theme.colors.border.default },
              ]}
            >
              <Typography tone="secondary">{String(index + 1)}</Typography>
              <Typography variant="bodyStrong">{number}</Typography>
            </View>
          ))}
        </View>
      )}
    </Card>
  );
}
const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  list: { marginTop: 4 },
  item: {
    minHeight: 44,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
});
