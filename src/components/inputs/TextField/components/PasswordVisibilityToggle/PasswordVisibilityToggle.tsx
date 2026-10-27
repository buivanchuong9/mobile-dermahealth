import { StyleSheet } from 'react-native';
import { translate } from '@i18n';
import { MIN_TOUCH_TARGET } from '../../../../../utils/accessibility';
import { Icon, PressableScale } from '../../../../primitives';
import { useTheme } from '../../../../../styles/theme';
import type { PasswordVisibilityToggleProps } from './PasswordVisibilityToggle.types';

/** Eye button that shows or hides a password. */
export function PasswordVisibilityToggle({
  revealed,
  onToggle,
  testID,
}: PasswordVisibilityToggleProps) {
  const theme = useTheme();
  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel={translate(
        revealed ? 'common.hidePassword' : 'common.showPassword',
      )}
      hitSlop={8}
      onPress={onToggle}
      style={styles.toggle}
      testID={testID}
    >
      <Icon
        name={revealed ? 'eye-off' : 'eye'}
        size={20}
        color={theme.colors.text.secondary}
      />
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  toggle: {
    width: MIN_TOUCH_TARGET - 8,
    height: MIN_TOUCH_TARGET - 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
