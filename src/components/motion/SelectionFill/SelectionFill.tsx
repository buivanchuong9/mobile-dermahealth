import { Animated, StyleSheet } from 'react-native';
import { useSelectionProgress } from '../hooks/useSelectionProgress';
import type { SelectionFillProps } from './SelectionFill.types';

/**
 * Background and border layer that eases between unselected and selected. It
 * sits behind the content so the pressable can scale on the native driver while
 * the colors use the JS driver.
 */
export function SelectionFill({
  selected,
  unselectedBackground,
  selectedBackground,
  unselectedBorder,
  selectedBorder,
  borderWidth = 0,
  borderRadius,
}: SelectionFillProps) {
  const { mix } = useSelectionProgress(selected);
  return (
    <Animated.View
      pointerEvents="none"
      style={[
        StyleSheet.absoluteFill,
        {
          borderRadius,
          borderWidth,
          backgroundColor: mix(unselectedBackground, selectedBackground),
          borderColor: mix(
            unselectedBorder ?? unselectedBackground,
            selectedBorder ?? selectedBackground,
          ),
        },
      ]}
    />
  );
}
