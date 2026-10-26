import { StyleSheet } from 'react-native';

const DOT_SIZE = 28;

export const styles = StyleSheet.create({
  rail: { width: DOT_SIZE, alignItems: 'center' },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: { width: 2, flex: 1, marginTop: 4 },
});
