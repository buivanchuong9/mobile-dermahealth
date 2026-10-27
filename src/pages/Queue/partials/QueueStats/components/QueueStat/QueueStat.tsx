import { StyleSheet, View } from 'react-native';
import { Typography } from '@components/primitives';
import type { QueueStatProps } from './QueueStat.types';

/** One labelled figure, read as a single phrase by screen readers. */
export function QueueStat({ label, value }: QueueStatProps) {
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

const styles = StyleSheet.create({ stat: { flex: 1, gap: 4 } });
