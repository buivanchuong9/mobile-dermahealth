import { SectionCard } from '@design-system/surfaces';
import { translate } from '@shared/localization';
import { InfoRow } from '../../../../components/InfoRow';
import { formatAppointmentWhen } from '../../../../formatters';
import type { AppointmentInfoCardProps } from './AppointmentInfoCard.types';

/** When, who and where of an appointment. */
export function AppointmentInfoCard({ appointment }: AppointmentInfoCardProps) {
  return (
    <SectionCard
      title={translate(`appointments.specialty.${appointment.specialtyId}`)}
    >
      <InfoRow
        icon="calendar-clock"
        label={translate('appointments.detail.when')}
        value={formatAppointmentWhen(appointment.startsAt)}
      />
      <InfoRow
        icon="stethoscope"
        label={translate('appointments.detail.doctor')}
        value={appointment.doctorName}
        secondaryValue={translate(
          `appointments.consultationType.${appointment.consultationType}`,
        )}
      />
      {appointment.consultationType === 'in_person' ? (
        <>
          <InfoRow
            icon="map-pin"
            label={translate('appointments.detail.place')}
            value={appointment.clinicName}
            secondaryValue={appointment.clinicAddress}
          />
          <InfoRow
            icon="door-open"
            label={translate('appointments.detail.room')}
            value={appointment.room}
            secondaryValue={appointment.department}
          />
        </>
      ) : (
        <InfoRow
          icon="video"
          label={translate('appointments.detail.place')}
          value={translate('appointments.detail.online')}
        />
      )}
    </SectionCard>
  );
}
