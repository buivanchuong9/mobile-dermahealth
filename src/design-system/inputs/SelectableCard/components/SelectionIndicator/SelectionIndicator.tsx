import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../../theme';

const SIZE = 24;

type SelectionIndicatorProps = {
  readonly shape: 'circle' | 'square';
  readonly selected: boolean;
};

/** Visual only; the parent card exposes the state to assistive technology. */
export function SelectionIndicator({
  shape,
  selected,
}: SelectionIndicatorProps) {
  const theme = useTheme();
  const borderRadius = shape === 'circle' ? SIZE / 2 : theme.radius.sm;
  const color = selected
    ? theme.colors.brand.primary
    : theme.colors.text.secondary;

  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[
        styles.box,
        {
          borderRadius,
          borderColor: color,
          backgroundColor:
            selected && shape === 'square'
              ? color
              : theme.colors.surface.primary,
        },
      ]}
    >
      {selected && shape === 'circle' ? (
        <View style={[styles.dot, { backgroundColor: color }]} />
      ) : null}
      {selected && shape === 'square' ? (
        <Text style={{ color: theme.colors.text.onBrand }}>✓</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: SIZE,
    height: SIZE,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: { width: 10, height: 10, borderRadius: 5 },
});
