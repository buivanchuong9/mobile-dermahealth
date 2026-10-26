import { StyleSheet, View } from 'react-native';
import { Typography } from '@design-system/primitives';
import { useTheme } from '@design-system/theme';
import { SlotButton } from './components/SlotButton';
import type { SlotGroupProps } from './SlotGroup.types';

/** A titled row of slots (for example "Buổi sáng"); empty groups are hidden. */
export function SlotGroup({
  title,
  slots,
  selected,
  onSelect,
  disabled,
}: SlotGroupProps) {
  const theme = useTheme();
  if (slots.length === 0) {
    return null;
  }
  return (
    <View style={{ gap: theme.spacing[2] }}>
      <Typography variant="caption" tone="secondary">
        {title}
      </Typography>
      <View style={[styles.grid, { gap: theme.spacing[2] }]}>
        {slots.map(slot => (
          <SlotButton
            key={slot.startsAt}
            slot={slot}
            selected={slot.startsAt === selected}
            disabled={disabled}
            onSelect={onSelect}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
});
