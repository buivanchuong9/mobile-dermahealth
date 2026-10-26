import {
  Banner,
  EmptyState,
  SimulationBanner,
  SkeletonRow,
} from '@design-system/feedback';
import { ScreenHeader } from '@design-system/navigation';
import { Button, Typography } from '@design-system/primitives';
import { ScreenContainer } from '@design-system/surfaces';
import { translate } from '@shared/localization';
import { BookingSummary } from '../../components/BookingSummary';
import { SlotGridSkeleton } from '../../components/SlotGridSkeleton';
import { ConsultationTypeSelector } from '../../components/ConsultationTypeSelector';
import { DateStrip } from '../../components/DateStrip';
import { SpecialtySelector } from '../../components/SpecialtySelector';
import { useBookingForm } from '../../hooks/useBookingForm';
import { getBookingHeading } from './BookAppointmentScreen.formatters';
import type { BookAppointmentScreenProps } from './BookAppointmentScreen.types';
import { BookingSection } from './components/BookingSection';
import { DoctorSection } from './components/DoctorSection';
import { TimeSection } from './components/TimeSection';

export function BookAppointmentScreen({
  repository,
  clock,
  mode,
  onBack,
  onCompleted,
}: BookAppointmentScreenProps) {
  const form = useBookingForm({ repository, clock, mode, onCompleted });
  const { title, subtitle } = getBookingHeading(
    mode,
    form.lockedAppointment?.doctorName,
  );
  const header = (
    <ScreenHeader title={title} subtitle={subtitle} onBack={onBack} />
  );

  if (form.isReschedule && form.target.status === 'loading') {
    return (
      <ScreenContainer header={header}>
        <SkeletonRow lines={2} />
        <SlotGridSkeleton />
      </ScreenContainer>
    );
  }

  if (form.isReschedule && form.target.status === 'error') {
    return (
      <ScreenContainer header={header}>
        <EmptyState
          icon="triangle-alert"
          title={translate('appointments.detail.notFound')}
          actionLabel={translate('common.back')}
          onAction={onBack}
        />
      </ScreenContainer>
    );
  }

  const footer = (
    <Button
      label={translate(
        form.isReschedule
          ? 'appointments.booking.confirmReschedule'
          : 'appointments.booking.confirm',
      )}
      onPress={form.submit}
      loading={form.submitting}
      fullWidth
      size="lg"
      testID="booking-submit"
    />
  );

  return (
    <ScreenContainer header={header} footer={footer}>
      <SimulationBanner />

      {form.isReschedule ? null : (
        <>
          <BookingSection title={translate('appointments.booking.typeSection')}>
            <ConsultationTypeSelector
              value={form.consultationType}
              onChange={form.setConsultationType}
              disabled={form.submitting}
            />
          </BookingSection>
          <BookingSection
            title={translate('appointments.booking.specialtySection')}
          >
            <SpecialtySelector
              value={form.specialtyId}
              onChange={form.selectSpecialty}
              disabled={form.submitting}
            />
          </BookingSection>
          <DoctorSection
            doctors={form.doctors.status === 'ready' ? form.doctors.data : null}
            selectedDoctorId={form.doctorId}
            onSelect={form.selectDoctor}
            showMissingDoctorIssue={form.issues.includes('missing_doctor')}
            disabled={form.submitting}
          />
        </>
      )}

      <BookingSection title={translate('appointments.booking.dateSection')}>
        <DateStrip
          dateKeys={form.dateKeys}
          selectedKey={form.dateKey}
          onSelect={form.selectDate}
          disabled={form.submitting}
        />
      </BookingSection>

      <TimeSection
        slots={form.slots.status === 'ready' ? form.slots.data : null}
        dateKey={form.dateKey}
        selected={form.startsAt}
        onSelect={form.selectSlot}
        issues={form.issues.filter(issue => issue !== 'missing_doctor')}
        disabled={form.submitting}
      />

      <BookingSummary
        doctor={form.doctor}
        startsAt={form.startsAt}
        consultationType={form.consultationType}
      />

      {form.submitFailed ? (
        <Banner
          tone="danger"
          message={translate('appointments.booking.submitFailed')}
        />
      ) : null}
      <Typography variant="caption" tone="secondary">
        {translate('appointments.booking.simulatedNote')}
      </Typography>
    </ScreenContainer>
  );
}
