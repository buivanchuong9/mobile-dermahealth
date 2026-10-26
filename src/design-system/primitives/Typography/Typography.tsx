import { Text } from 'react-native';
import { useTheme } from '../../theme';
import type { TypographyProps } from './Typography.types';

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
