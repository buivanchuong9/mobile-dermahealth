import { View } from 'react-native';
import Svg from 'react-native-svg';
import { useTheme } from '../../theme';
import { SCENES } from './Illustration.scenes';
import type { IllustrationProps } from './Illustration.types';

const ARTBOARD_WIDTH = 240;
const ARTBOARD_HEIGHT = 200;

/**
 * Decorative vector scene drawn from theme colors, so it follows the palette.
 * Hidden from screen readers; the screen text carries the meaning.
 */
export function Illustration({ name, width = 240 }: IllustrationProps) {
  const { colors } = useTheme();
  const height = (width * ARTBOARD_HEIGHT) / ARTBOARD_WIDTH;
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${ARTBOARD_WIDTH} ${ARTBOARD_HEIGHT}`}
      >
        {SCENES[name]({
          primary: colors.brand.primary,
          primaryDark: colors.brand.primaryDark,
          soft: colors.brand.primaryLight,
          surface: colors.surface.primary,
          line: colors.border.default,
          success: colors.status.success,
        })}
      </Svg>
    </View>
  );
}
