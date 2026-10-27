import { useTheme } from '../../../styles/theme';
import { iconMap } from './iconMap';
import type { IconProps } from './Icon.types';

/** Decorative by default: put the meaning in the surrounding label. */
export function Icon({ name, size = 20, color, strokeWidth = 2 }: IconProps) {
  const theme = useTheme();
  const Glyph = iconMap[name];
  return (
    <Glyph
      size={size}
      color={color ?? theme.colors.text.primary}
      strokeWidth={strokeWidth}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    />
  );
}
