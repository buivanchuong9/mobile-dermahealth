import { Typography } from '@components/primitives';
import { translate } from '@i18n';
import { formatWeekdayShort } from '@utils/localDateTime';
import { SlotGridSkeleton } from '../../../partials/SlotGridSkeleton';
import { TimeSlotGrid } from '../../../partials/TimeSlotGrid';
import { BookingSection } from '../BookingSection';
import type { TimeSectionProps } from './TimeSection.types';

export function TimeSection({
  slots,
  dateKey,
  selected,
  onSelect,
  issues,
  disabled,
}: TimeSectionProps) {
  const isSunday = formatWeekdayShort(`${dateKey}T00:00`) === 'CN';
  return (
    <BookingSection title={translate('appointments.booking.timeSection')}>
      {slots === null ? (
        <SlotGridSkeleton />
      ) : isSunday ? (
        <Typography tone="secondary">
          {translate('appointments.booking.sundayClosed')}
        </Typography>
      ) : slots.every(slot => !slot.available) ? (
        <Typography tone="secondary">
          {translate('appointments.booking.noSlots')}
        </Typography>
      ) : (
        <TimeSlotGrid
          slots={slots}
          selected={selected}
          onSelect={onSelect}
          disabled={disabled}
        />
      )}
      {issues.map(issue => (
        <Typography
          key={issue}
          variant="caption"
          tone="error"
          accessibilityRole="alert"
        >
          {translate(`appointments.booking.issues.${issue}`)}
        </Typography>
      ))}
    </BookingSection>
  );
}
