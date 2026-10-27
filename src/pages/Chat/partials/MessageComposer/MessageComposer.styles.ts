import { StyleSheet } from 'react-native';
import { MIN_TOUCH_TARGET } from '@utils/accessibility';

export const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-end' },
  input: {
    flex: 1,
    maxHeight: 120,
    minHeight: MIN_TOUCH_TARGET,
    borderWidth: 1.5,
    paddingVertical: 10,
  },
  send: {
    width: MIN_TOUCH_TARGET,
    height: MIN_TOUCH_TARGET,
    borderRadius: MIN_TOUCH_TARGET / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
