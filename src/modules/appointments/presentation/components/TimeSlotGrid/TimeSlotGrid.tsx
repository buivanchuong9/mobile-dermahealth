import { View } from 'react-native';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import { formatTime } from '@shared/utilities/localDateTime';
import type { TimeSlot } from '../../../domain/entities/Appointment';
import { SlotGroup } from './components/SlotGroup';
import type { TimeSlotGridProps } from './TimeSlotGrid.types';

const NOON = 12;

const isMorning = (slot: TimeSlot): boolean =>
  Number(formatTime(slot.startsAt).slice(0, 2)) < NOON;

/** Morning and afternoon slots for a day. */
export function TimeSlotGrid({
  slots,
  selected,
  onSelect,
  disabled = false,
}: TimeSlotGridProps) {
  const theme = useTheme();
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
