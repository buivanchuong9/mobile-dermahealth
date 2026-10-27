import { StyleSheet } from 'react-native';
import type { ViewStyle } from 'react-native';
import { MIN_TOUCH_TARGET } from '../../../utils/accessibility';
import type { Theme } from '../../../styles/theme';
import type { ButtonSize, ButtonVariant } from './Button.types';

export const BUTTON_HEIGHT: Record<ButtonSize, number> = {
  sm: 40,
  md: 48,
  lg: 56,
};

type VariantColors = {
  readonly background: string;
  readonly label: string;
};

export function getVariantColors(
  theme: Theme,
  variant: ButtonVariant,
  disabled: boolean,
): VariantColors {
  const { colors } = theme;
  if (disabled) {
    return {
      background:
        variant === 'ghost' ? 'transparent' : colors.state.disabledBackground,
      label: colors.text.disabled,
    };
  }
  switch (variant) {
    case 'primary':
      return { background: colors.brand.primary, label: colors.text.onBrand };
    case 'secondary':
      return {
        background: colors.brand.primaryLight,
        label: colors.text.onBrandLight,
      };
    case 'danger':
      return { background: colors.status.error, label: colors.text.onBrand };
    case 'ghost':
      return { background: 'transparent', label: colors.brand.primary };
  }
}

export function getSizeStyle(theme: Theme, size: ButtonSize): ViewStyle {
  const horizontal = { sm: 4, md: 5, lg: 6 } as const;
  return {
    minHeight: BUTTON_HEIGHT[size],
    paddingHorizontal: theme.spacing[horizontal[size]],
  };
}

/** Extra hit area so small buttons still meet the minimum touch target. */
export function getHitSlop(size: ButtonSize): number {
  return Math.max(0, Math.ceil((MIN_TOUCH_TARGET - BUTTON_HEIGHT[size]) / 2));
}

export const staticStyles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: { alignSelf: 'stretch' },
  spinner: { marginRight: 8 },
});
