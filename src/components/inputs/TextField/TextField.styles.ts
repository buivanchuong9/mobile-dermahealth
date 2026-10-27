import { StyleSheet } from 'react-native';
import { MIN_TOUCH_TARGET } from '../../../utils/accessibility';

export const styles = StyleSheet.create({
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    minHeight: MIN_TOUCH_TARGET + 8,
  },
  input: { flex: 1, paddingVertical: 10 },
});
