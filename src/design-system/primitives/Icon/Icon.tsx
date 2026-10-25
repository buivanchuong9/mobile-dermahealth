import { useTheme } from '../../theme';
import { iconMap } from './iconMap';
import type { IconName } from './iconMap';

export type IconProps = {
  readonly name: IconName;
  readonly size?: number;
  /** Defaults to the primary text color. */
  readonly color?: string;
  readonly strokeWidth?: number;
};

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
