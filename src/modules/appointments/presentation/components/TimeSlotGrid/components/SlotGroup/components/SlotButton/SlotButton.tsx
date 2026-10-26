import { StyleSheet } from 'react-native';
import { MIN_TOUCH_TARGET } from '@design-system/accessibility';
import { SelectionFill } from '@design-system/motion';
import { PressableScale, Typography } from '@design-system/primitives';
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
  const idleBackground = unavailable
    ? theme.colors.state.disabledBackground
    : theme.colors.surface.primary;

  return (
    <PressableScale
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
      style={[styles.slot, { borderRadius: theme.radius.md }]}
      testID={`slot-${slot.startsAt}`}
    >
      <SelectionFill
        selected={selected}
        unselectedBackground={idleBackground}
        selectedBackground={theme.colors.brand.primary}
        unselectedBorder={theme.colors.border.default}
        selectedBorder={theme.colors.brand.primary}
        borderWidth={1.5}
        borderRadius={theme.radius.md}
      />
      <Typography
        variant="bodyStrong"
        tone={selected ? 'onBrand' : unavailable ? 'secondary' : 'primary'}
      >
        {label}
      </Typography>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  slot: {
    width: '31%',
    minHeight: MIN_TOUCH_TARGET,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
