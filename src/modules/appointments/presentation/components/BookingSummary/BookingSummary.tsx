import { SectionCard } from '@design-system/surfaces';
import { Typography } from '@design-system/primitives';
import { translate } from '@shared/localization';
import { formatAppointmentWhen } from '../../formatters';
import { InfoRow } from '../InfoRow';
import type { BookingSummaryProps } from './BookingSummary.types';

export function BookingSummary({
  doctor,
  startsAt,
  consultationType,
}: BookingSummaryProps) {
  return (
    <SectionCard
      title={translate('appointments.booking.summary')}
      testID="booking-summary"
    >
      {doctor && startsAt ? (
        <>
          <InfoRow
            icon="stethoscope"
            label={translate('appointments.detail.doctor')}
            value={doctor.name}
            secondaryValue={doctor.title}
          />
          <InfoRow
            icon="calendar-clock"
            label={translate('appointments.detail.when')}
            value={formatAppointmentWhen(startsAt)}
          />
          <InfoRow
            icon={consultationType === 'video' ? 'video' : 'building-2'}
            label={translate('appointments.booking.typeSection')}
            value={translate(
              `appointments.consultationType.${consultationType}`,
            )}
          />
        </>
      ) : (
        <Typography tone="secondary">
          {translate('appointments.booking.summaryEmpty')}
        </Typography>
      )}
    </SectionCard>
  );
}
