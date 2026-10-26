import { Pressable, StyleSheet } from 'react-native';
import { MIN_TOUCH_TARGET } from '@design-system/accessibility';
import { Typography } from '@design-system/primitives';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import { formatTime } from '@shared/utilities/localDateTime';
import type { SlotButtonProps } from './SlotButton.types';

/** One selectable time; unavailable slots are disabled and announced as full. */
export function SlotButton({
  slot,
  selected,
  disabled,
  onSelect,
}: SlotButtonProps) {
  const theme = useTheme();
  const unavailable = !slot.available;
  const label = formatTime(slot.startsAt);
  const background = selected
    ? theme.colors.brand.primary
    : unavailable
    ? theme.colors.state.disabledBackground
    : theme.colors.surface.primary;
  const border = selected
    ? theme.colors.brand.primary
    : theme.colors.border.default;

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityLabel={
        unavailable
          ? `${label}, ${translate('appointments.booking.slotUnavailable')}`
          : label
      }
      accessibilityState={{
        checked: selected,
        disabled: unavailable || disabled,
      }}
      disabled={unavailable || disabled}
      onPress={() => onSelect(slot.startsAt)}
      style={[
        styles.slot,
        {
          borderRadius: theme.radius.md,
          backgroundColor: background,
          borderColor: border,
        },
      ]}
      testID={`slot-${slot.startsAt}`}
    >
      <Typography
        variant="bodyStrong"
        tone={selected ? 'onBrand' : unavailable ? 'secondary' : 'primary'}
      >
        {label}
      </Typography>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  slot: {
    width: '31%',
    minHeight: MIN_TOUCH_TARGET,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
});
