import { Animated, StyleSheet, View } from 'react-native';
import { useTheme } from '@styles/theme';
import { useReducedMotion } from '@components/motion';
import { getDotAnimatedStyle } from './PageDots.animations';
import { ACTIVE_WIDTH, DOT } from './PageDots.constants';
import type { PageDotsProps } from './PageDots.types';

/** Dots whose active one widens smoothly while the pager scrolls. */
export function PageDots({
  count,
  scrollX,
  pageWidth,
  activeIndex,
}: PageDotsProps) {
  const theme = useTheme();
  const reducedMotion = useReducedMotion();
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[styles.row, { gap: theme.spacing[2] }]}
    >
      {Array.from({ length: count }, (_, index) => (
        <Animated.View
          key={index}
          style={[
            styles.dot,
            { backgroundColor: theme.colors.brand.primary },
            reducedMotion
              ? index === activeIndex
                ? styles.active
                : styles.inactive
              : getDotAnimatedStyle(scrollX, pageWidth, index),
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  dot: { width: ACTIVE_WIDTH, height: DOT, borderRadius: DOT / 2 },
  active: { opacity: 1, transform: [{ scaleX: 1 }] },
  inactive: { opacity: 0.3, transform: [{ scaleX: 0.45 }] },
});
