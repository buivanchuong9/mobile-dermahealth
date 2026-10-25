import { Pressable, StyleSheet, View } from 'react-native';
import { MIN_TOUCH_TARGET } from '@design-system/accessibility';
import { Typography } from '@design-system/primitives';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import { formatTime } from '@shared/utilities/localDateTime';
import type { LocalDateTime } from '@shared/utilities/localDateTime';
import type { TimeSlot } from '../../../domain/entities/Appointment';

export type TimeSlotGridProps = {
  readonly slots: readonly TimeSlot[];
  readonly selected: LocalDateTime | null;
  readonly onSelect: (startsAt: LocalDateTime) => void;
  readonly disabled?: boolean;
};

const NOON = 12;

function SlotGroup({
  title,
  slots,
  selected,
  onSelect,
  disabled,
}: {
  readonly title: string;
  readonly slots: readonly TimeSlot[];
  readonly selected: LocalDateTime | null;
  readonly onSelect: (startsAt: LocalDateTime) => void;
  readonly disabled: boolean;
}) {
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
        {slots.map(slot => {
          const isSelected = slot.startsAt === selected;
          const unavailable = !slot.available;
          const label = formatTime(slot.startsAt);
          const background = isSelected
            ? theme.colors.brand.primary
            : unavailable
            ? theme.colors.state.disabledBackground
            : theme.colors.surface.primary;
          const border = isSelected
            ? theme.colors.brand.primary
            : theme.colors.border.default;
          return (
            <Pressable
              key={slot.startsAt}
              accessibilityRole="radio"
              accessibilityLabel={
                unavailable
                  ? `${label}, ${translate(
                      'appointments.booking.slotUnavailable',
                    )}`
                  : label
              }
              accessibilityState={{
                checked: isSelected,
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
                tone={
                  isSelected ? 'onBrand' : unavailable ? 'secondary' : 'primary'
                }
              >
                {label}
              </Typography>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export function TimeSlotGrid({
  slots,
  selected,
  onSelect,
  disabled = false,
}: TimeSlotGridProps) {
  const theme = useTheme();
  const isMorning = (slot: TimeSlot) =>
    Number(formatTime(slot.startsAt).slice(0, 2)) < NOON;
  return (
    <View style={{ gap: theme.spacing[3] }}>
      <SlotGroup
        title={translate('appointments.booking.morning')}
        slots={slots.filter(isMorning)}
        selected={selected}
        onSelect={onSelect}
        disabled={disabled}
      />
      <SlotGroup
        title={translate('appointments.booking.afternoon')}
        slots={slots.filter(slot => !isMorning(slot))}
        selected={selected}
        onSelect={onSelect}
        disabled={disabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  slot: {
    width: '31%',
    minHeight: MIN_TOUCH_TARGET,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
});
