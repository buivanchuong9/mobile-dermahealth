import { Children } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@styles/theme';
import type { OptionGridProps } from './OptionGrid.types';

/** Two-column wrapping grid for short answer options. */
export function OptionGrid({ children }: OptionGridProps) {
  const theme = useTheme();
  return (
    <View style={[styles.grid, { gap: theme.spacing[2] }]}>
      {Children.toArray(children).map((child, index) => (
        <View key={index} style={styles.cell}>
          {child}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  cell: { flexGrow: 1, flexBasis: '45%' },
});
