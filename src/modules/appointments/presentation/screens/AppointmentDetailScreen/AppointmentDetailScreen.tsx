import { useState } from 'react';
import { View } from 'react-native';
import type { Clock } from '@core/contracts';
import {
  EmptyState,
  SimulationBanner,
  SkeletonCard,
} from '@design-system/feedback';
import { Banner } from '@design-system/feedback';
import { ScreenHeader } from '@design-system/navigation';
import { ConfirmDialog } from '@design-system/overlays';
import { Button, Typography } from '@design-system/primitives';
import { ScreenContainer, SectionCard } from '@design-system/surfaces';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import type { Appointment } from '../../../domain/entities/Appointment';
import type { AppointmentRepository } from '../../../domain/repositories/AppointmentRepository';
import { AppointmentStatusBadge } from '../../components/AppointmentStatusBadge';
import { InfoRow } from '../../components/InfoRow';
import { PreparationList } from '../../components/PreparationList';
import { useAppointmentDetail } from '../../hooks/useAppointmentDetail';
import { formatAppointmentWhen } from '../../formatters';

export type AppointmentDetailScreenProps = {
  readonly repository: AppointmentRepository;
  readonly clock: Clock;
  readonly appointmentId: string;
  readonly onBack: () => void;
  readonly onReschedule: (appointmentId: string) => void;
  readonly onCheckedIn: (appointment: Appointment) => void;
};

export function AppointmentDetailScreen({
  repository,
  clock,
  appointmentId,
  onBack,
  onReschedule,
  onCheckedIn,
}: AppointmentDetailScreenProps) {
  const theme = useTheme();
  const detail = useAppointmentDetail(repository, appointmentId, clock);
  const [confirmingCancel, setConfirmingCancel] = useState(false);
  const header = (
    <ScreenHeader
      title={translate('appointments.detail.title')}
      onBack={onBack}
    />
  );

  if (detail.query.status === 'loading') {
    return (
      <ScreenContainer header={header}>
        <SkeletonCard lines={4} />
        <SkeletonCard />
      </ScreenContainer>
    );
  }
  const { appointment } = detail;
  if (detail.query.status === 'error' || appointment === null) {
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

  const isActive =
    appointment.status === 'confirmed' || appointment.status === 'checked_in';

  const handleCheckIn = async () => {
    const result = await detail.checkIn();
    if (result) {
      onCheckedIn(result);
    }
  };

  const handleCancel = async () => {
    await detail.cancel();
    setConfirmingCancel(false);
  };

  return (
    <ScreenContainer header={header}>
      <SimulationBanner />
      <AppointmentStatusBadge status={appointment.status} />

      {detail.notice === 'cancelled' ? (
        <Banner
          tone="success"
          message={translate('appointments.detail.cancelled')}
        />
      ) : null}
      {detail.notice === 'failed' ? (
        <Banner
          tone="danger"
          message={translate('appointments.detail.actionFailed')}
        />
      ) : null}

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

      {isActive ? (
        <SectionCard title={translate('appointments.detail.preparation')}>
          <PreparationList items={appointment.preparation} />
        </SectionCard>
      ) : null}

      {isActive ? (
        <View style={{ gap: theme.spacing[2] }}>
          {appointment.consultationType === 'in_person' &&
          appointment.status === 'confirmed' ? (
            <>
              <Button
                label={translate('appointments.detail.checkIn')}
                onPress={handleCheckIn}
                loading={detail.busy === 'check_in'}
                disabled={!detail.canCheckIn}
                fullWidth
                testID="appointment-check-in"
              />
              {detail.canCheckIn ? null : (
                <Typography variant="caption" tone="secondary">
                  {translate('appointments.detail.checkInHint')}
                </Typography>
              )}
            </>
          ) : null}
          <Button
            label={translate('appointments.detail.reschedule')}
            variant="secondary"
            onPress={() => onReschedule(appointment.id)}
            disabled={detail.changeBlockReason !== null}
            fullWidth
            testID="appointment-reschedule"
          />
          <Button
            label={translate('appointments.detail.cancel')}
            variant="ghost"
            onPress={() => setConfirmingCancel(true)}
            disabled={detail.changeBlockReason !== null}
            fullWidth
            testID="appointment-cancel"
          />
          {detail.changeBlockReason ? (
            <Typography variant="caption" tone="secondary">
              {translate(
                `appointments.detail.blocked.${detail.changeBlockReason}`,
              )}
            </Typography>
          ) : null}
        </View>
      ) : null}

      <Typography variant="caption" tone="secondary">
        {translate('appointments.detail.simulatedNote')}
      </Typography>

      <ConfirmDialog
        visible={confirmingCancel}
        title={translate('appointments.detail.cancelDialog.title')}
        message={translate('appointments.detail.cancelDialog.message', {
          time: formatAppointmentWhen(appointment.startsAt),
        })}
        confirmLabel={translate('appointments.detail.cancelDialog.confirm')}
        cancelLabel={translate('appointments.detail.cancelDialog.keep')}
        destructive
        loading={detail.busy === 'cancel'}
        onConfirm={handleCancel}
        onCancel={() => setConfirmingCancel(false)}
      />
    </ScreenContainer>
  );
}
