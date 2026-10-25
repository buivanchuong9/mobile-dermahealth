import { Text } from 'react-native';
import type { ReactNode } from 'react';
import { useTheme } from '../../theme';
import type { Typography as TypographyTokens } from '../../tokens';

export type TypographyVariant = Exclude<
  keyof TypographyTokens,
  'button' | 'buttonSmall'
>;
export type TypographyTone =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'brand'
  | 'onBrand';

export type TypographyProps = {
  readonly children: ReactNode;
  readonly variant?: TypographyVariant;
  readonly tone?: TypographyTone;
  readonly align?: 'left' | 'center' | 'right';
  readonly numberOfLines?: number;
  readonly accessibilityRole?: 'header' | 'alert' | 'text';
  readonly accessibilityLiveRegion?: 'none' | 'polite' | 'assertive';
  readonly testID?: string;
};

export function Typography({
  children,
  variant = 'body',
  tone = 'primary',
  align,
  numberOfLines,
  accessibilityRole,
  accessibilityLiveRegion,
  testID,
}: TypographyProps) {
  const theme = useTheme();
  const color = {
    primary: theme.colors.text.primary,
    secondary: theme.colors.text.secondary,
    error: theme.colors.status.error,
    brand: theme.colors.brand.primary,
    onBrand: theme.colors.text.onBrand,
  }[tone];

  return (
    <Text
      accessibilityRole={accessibilityRole}
      accessibilityLiveRegion={accessibilityLiveRegion}
      numberOfLines={numberOfLines}
      style={[
        theme.typography[variant],
        { color },
        align && { textAlign: align },
      ]}
      testID={testID}
    >
      {children}
    </Text>
  );
}
