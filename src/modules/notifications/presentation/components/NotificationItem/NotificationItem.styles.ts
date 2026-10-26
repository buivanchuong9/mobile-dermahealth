import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  row: { flexDirection: 'row', borderWidth: 1 },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { flex: 1 },
  titleRow: { flexDirection: 'row', alignItems: 'center' },
  pressed: { opacity: 0.85 },
});
