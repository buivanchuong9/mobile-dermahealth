import { ActivityIndicator, Text } from 'react-native';
import { translate } from '@shared/localization';
import { useTheme } from '../../theme';
import { PressableScale } from '../PressableScale';
import { getPressFeedback } from './Button.feedback';
import {
  getHitSlop,
  getSizeStyle,
  getVariantColors,
  staticStyles,
} from './Button.styles';
import type { ButtonProps } from './Button.types';

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  accessibilityLabel,
  accessibilityHint,
  testID,
}: ButtonProps) {
  const theme = useTheme();
  const inactive = disabled || loading;
  const colors = getVariantColors(theme, variant, disabled);
  const feedback = getPressFeedback(colors.label);
  const textToken =
    size === 'sm' ? theme.typography.buttonSmall : theme.typography.button;
  const spokenLabel = accessibilityLabel ?? label;

  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel={
        loading ? `${spokenLabel}, ${translate('common.loading')}` : spokenLabel
      }
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: inactive, busy: loading }}
      disabled={inactive}
      hitSlop={getHitSlop(size)}
      onPress={onPress}
      testID={testID}
      pressedOpacity={feedback.pressedOpacity}
      {...feedback.pressableProps}
      style={[
        staticStyles.base,
        getSizeStyle(theme, size),
        { backgroundColor: colors.background, borderRadius: theme.radius.md },
        fullWidth && staticStyles.fullWidth,
        feedback.containerStyle,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          color={colors.label}
          size="small"
          style={staticStyles.spinner}
        />
      ) : null}
      <Text style={[textToken, { color: colors.label }]}>{label}</Text>
    </PressableScale>
  );
}
