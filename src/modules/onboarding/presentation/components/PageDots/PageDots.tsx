import { Animated, StyleSheet, View } from 'react-native';
import { useTheme } from '@design-system/theme';
import { getDotAnimatedStyle } from './PageDots.animations';
import { DOT } from './PageDots.constants';
import type { PageDotsProps } from './PageDots.types';

/** Dots whose active one widens smoothly while the pager scrolls. */
export function PageDots({ count, scrollX, pageWidth }: PageDotsProps) {
  const theme = useTheme();
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
            getDotAnimatedStyle(scrollX, pageWidth, index),
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  dot: { height: DOT, borderRadius: DOT / 2 },
});
