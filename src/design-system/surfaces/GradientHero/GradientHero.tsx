import { StyleSheet, View } from 'react-native';
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Rect,
  Stop,
} from 'react-native-svg';
import { useTheme } from '../../theme';
import type { GradientHeroProps } from './GradientHero.types';

/** Rounded brand-gradient panel with soft decorative circles behind content. */
export function GradientHero({ children, style }: GradientHeroProps) {
  const theme = useTheme();
  const { brand } = theme.colors;
  return (
    <View
      style={[
        styles.root,
        { borderRadius: theme.radius.xl, padding: theme.spacing[4] },
        style,
      ]}
    >
      <Svg
        style={StyleSheet.absoluteFill}
        viewBox="0 0 300 300"
        preserveAspectRatio="xMidYMid slice"
        pointerEvents="none"
      >
        <Defs>
          <LinearGradient id="hero" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={brand.primary} />
            <Stop offset="1" stopColor={brand.primaryDark} />
          </LinearGradient>
        </Defs>
        <Rect x={0} y={0} width={300} height={300} fill="url(#hero)" />
        <Circle cx={270} cy={30} r={90} fill="#FFFFFF" opacity={0.08} />
        <Circle cx={30} cy={280} r={120} fill="#FFFFFF" opacity={0.07} />
        <Circle cx={250} cy={260} r={40} fill="#FFFFFF" opacity={0.08} />
      </Svg>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { overflow: 'hidden', alignItems: 'center', justifyContent: 'center' },
});
