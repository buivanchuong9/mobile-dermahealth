import { Skeleton } from '@design-system/feedback';
import { Typography } from '@design-system/primitives';
import { translate } from '@shared/localization';
import { formatWeekdayShort } from '@shared/utilities/localDateTime';
import { TimeSlotGrid } from '../../../../components/TimeSlotGrid';
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
        <Skeleton height={96} />
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
