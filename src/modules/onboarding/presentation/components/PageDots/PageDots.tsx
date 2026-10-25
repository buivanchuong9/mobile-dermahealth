import { Animated, StyleSheet, View } from 'react-native';
import { useTheme } from '@design-system/theme';

export type PageDotsProps = {
  readonly count: number;
  /** Horizontal scroll offset in pixels. */
  readonly scrollX: Animated.Value;
  readonly pageWidth: number;
};

const DOT = 8;
const ACTIVE_WIDTH = 24;

/** Dots whose active one widens smoothly while the pager scrolls. */
export function PageDots({ count, scrollX, pageWidth }: PageDotsProps) {
  const theme = useTheme();
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[styles.row, { gap: theme.spacing[2] }]}
    >
      {Array.from({ length: count }, (_, index) => {
        const range = [
          (index - 1) * pageWidth,
          index * pageWidth,
          (index + 1) * pageWidth,
        ];
        return (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: theme.colors.brand.primary,
                width: scrollX.interpolate({
                  inputRange: range,
                  outputRange: [DOT, ACTIVE_WIDTH, DOT],
                  extrapolate: 'clamp',
                }),
                opacity: scrollX.interpolate({
                  inputRange: range,
                  outputRange: [0.3, 1, 0.3],
                  extrapolate: 'clamp',
                }),
              },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  dot: { height: DOT, borderRadius: DOT / 2 },
});
