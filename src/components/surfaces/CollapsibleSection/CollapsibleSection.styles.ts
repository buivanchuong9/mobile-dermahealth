import { StyleSheet } from 'react-native';
import { MIN_TOUCH_TARGET } from '../../../utils/accessibility';

export const styles = StyleSheet.create({
  card: { borderWidth: 1, overflow: 'hidden' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: MIN_TOUCH_TARGET,
  },
  title: { flex: 1 },
});
