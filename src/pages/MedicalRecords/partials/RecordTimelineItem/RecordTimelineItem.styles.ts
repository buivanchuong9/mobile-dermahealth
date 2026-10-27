import { StyleSheet } from 'react-native';

export const DOT = 14;

export const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  rail: { width: DOT, alignItems: 'center', paddingTop: 6 },
  dot: { width: DOT, height: DOT, borderRadius: DOT / 2 },
  line: { width: 2, flex: 1, marginTop: 4 },
  card: { flex: 1 },
  footer: { flexDirection: 'row', alignItems: 'center' },
  spacer: { flex: 1 },
});
