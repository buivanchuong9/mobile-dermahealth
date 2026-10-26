import { StyleSheet } from 'react-native';
import { MIN_TOUCH_TARGET } from '../../accessibility';

export const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  back: {
    width: MIN_TOUCH_TARGET,
    height: MIN_TOUCH_TARGET,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  titles: { flex: 1 },
});
