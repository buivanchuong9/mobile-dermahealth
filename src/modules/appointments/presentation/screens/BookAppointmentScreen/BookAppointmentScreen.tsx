import { View } from 'react-native';
import type { Clock } from '@core/contracts';
import {
  Banner,
  EmptyState,
  Skeleton,
  SimulationBanner,
} from '@design-system/feedback';
import { ScreenHeader } from '@design-system/navigation';
import { Button, Typography } from '@design-system/primitives';
import { ScreenContainer } from '@design-system/surfaces';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import { formatWeekdayShort } from '@shared/utilities/localDateTime';
import type { Appointment } from '../../../domain/entities/Appointment';
import type { AppointmentRepository } from '../../../domain/repositories/AppointmentRepository';
import { BookingSummary } from '../../components/BookingSummary';
import { ConsultationTypeSelector } from '../../components/ConsultationTypeSelector';
import { DateStrip } from '../../components/DateStrip';
import { DoctorSelector } from '../../components/DoctorSelector';
import { SpecialtySelector } from '../../components/SpecialtySelector';
import { TimeSlotGrid } from '../../components/TimeSlotGrid';
import { useBookingForm } from '../../hooks/useBookingForm';
import type { BookingMode } from '../../hooks/useBookingForm';

export type BookAppointmentScreenProps = {
  readonly repository: AppointmentRepository;
  readonly clock: Clock;
  readonly mode: BookingMode;
  readonly onBack: () => void;
  readonly onCompleted: (appointment: Appointment) => void;
};

function SectionTitle({ children }: { readonly children: string }) {
  return (
    <Typography variant="subtitle" accessibilityRole="header">
      {children}
    </Typography>
  );
}

export function BookAppointmentScreen({
  repository,
  clock,
  mode,
  onBack,
  onCompleted,
}: BookAppointmentScreenProps) {
  const theme = useTheme();
  const form = useBookingForm({ repository, clock, mode, onCompleted });

  const title = form.isReschedule
    ? translate('appointments.booking.rescheduleTitle')
    : mode.type === 'new' && mode.followUp
    ? translate('appointments.booking.followUpTitle')
    : translate('appointments.booking.title');

  const intro = form.isReschedule
    ? form.lockedAppointment
      ? translate('appointments.booking.rescheduleIntro', {
          doctor: form.lockedAppointment.doctorName,
        })
      : undefined
    : mode.type === 'new' && mode.followUp
    ? translate('appointments.booking.followUpIntro')
    : undefined;

  const header = (
    <ScreenHeader title={title} subtitle={intro} onBack={onBack} />
  );

  if (form.isReschedule && form.target.status === 'loading') {
    return (
      <ScreenContainer header={header}>
        <Skeleton height={120} />
        <Skeleton height={200} />
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

  const issueText = form.issues.map(issue =>
    translate(`appointments.booking.issues.${issue}`),
  );
  const doctorIssue = form.issues.includes('missing_doctor');
  const timeIssues = issueText.filter(
    (_, index) => form.issues[index] !== 'missing_doctor',
  );
  const slotList = form.slots.status === 'ready' ? form.slots.data : [];
  const isSunday = formatWeekdayShort(`${form.dateKey}T00:00`) === 'CN';

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
          <View style={{ gap: theme.spacing[2] }}>
            <SectionTitle>
              {translate('appointments.booking.typeSection')}
            </SectionTitle>
            <ConsultationTypeSelector
              value={form.consultationType}
              onChange={form.setConsultationType}
              disabled={form.submitting}
            />
          </View>
          <View style={{ gap: theme.spacing[2] }}>
            <SectionTitle>
              {translate('appointments.booking.specialtySection')}
            </SectionTitle>
            <SpecialtySelector
              value={form.specialtyId}
              onChange={form.selectSpecialty}
              disabled={form.submitting}
            />
          </View>
          <View style={{ gap: theme.spacing[2] }}>
            <SectionTitle>
              {translate('appointments.booking.doctorSection')}
            </SectionTitle>
            {form.doctors.status === 'loading' ? (
              <Skeleton height={64} />
            ) : (
              <DoctorSelector
                doctors={
                  form.doctors.status === 'ready' ? form.doctors.data : []
                }
                value={form.doctorId}
                onChange={form.selectDoctor}
                label={translate('appointments.booking.doctorSection')}
                disabled={form.submitting}
              />
            )}
            {doctorIssue ? (
              <Typography
                variant="caption"
                tone="error"
                accessibilityRole="alert"
              >
                {translate('appointments.booking.issues.missing_doctor')}
              </Typography>
            ) : null}
          </View>
        </>
      )}

      <View style={{ gap: theme.spacing[2] }}>
        <SectionTitle>
          {translate('appointments.booking.dateSection')}
        </SectionTitle>
        <DateStrip
          dateKeys={form.dateKeys}
          selectedKey={form.dateKey}
          onSelect={form.selectDate}
          disabled={form.submitting}
        />
      </View>

      <View style={{ gap: theme.spacing[2] }}>
        <SectionTitle>
          {translate('appointments.booking.timeSection')}
        </SectionTitle>
        {form.slots.status === 'loading' ? (
          <Skeleton height={96} />
        ) : isSunday ? (
          <Typography tone="secondary">
            {translate('appointments.booking.sundayClosed')}
          </Typography>
        ) : slotList.every(slot => !slot.available) ? (
          <Typography tone="secondary">
            {translate('appointments.booking.noSlots')}
          </Typography>
        ) : (
          <TimeSlotGrid
            slots={slotList}
            selected={form.startsAt}
            onSelect={form.selectSlot}
            disabled={form.submitting}
          />
        )}
        {timeIssues.map(text => (
          <Typography
            key={text}
            variant="caption"
            tone="error"
            accessibilityRole="alert"
          >
            {text}
          </Typography>
        ))}
      </View>

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
