import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: { alignItems: 'flex-start' },
  number: {
    fontSize: 56,
    lineHeight: 64,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  stage: { alignSelf: 'flex-start' },
  row: { flexDirection: 'row', alignItems: 'center' },
});
