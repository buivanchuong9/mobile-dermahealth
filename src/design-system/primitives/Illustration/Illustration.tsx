import { Animated } from 'react-native';
import Svg from 'react-native-svg';
import { useFloatAnimation } from '../../motion';
import { useTheme } from '../../theme';
import { SCENES } from './Illustration.scenes';
import type { IllustrationProps } from './Illustration.types';

const ARTBOARD_WIDTH = 240;
const ARTBOARD_HEIGHT = 200;

/**
 * Decorative vector scene drawn from theme colors, so it follows the palette.
 * Hidden from screen readers; the screen text carries the meaning.
 */
export function Illustration({
  name,
  width = 240,
  tone = 'default',
}: IllustrationProps) {
  const { colors } = useTheme();
  const float = useFloatAnimation();
  const height = (width * ARTBOARD_HEIGHT) / ARTBOARD_WIDTH;
  return (
    <Animated.View
      style={float}
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
          soft:
            tone === 'onBrand'
              ? 'rgba(255,255,255,0.2)'
              : colors.brand.primaryLight,
          tile: colors.brand.primaryLight,
          surface: colors.surface.primary,
          line: colors.border.default,
          success: colors.status.success,
        })}
      </Svg>
    </Animated.View>
  );
}
