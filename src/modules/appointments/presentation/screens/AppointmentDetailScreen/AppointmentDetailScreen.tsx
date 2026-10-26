import { useState } from 'react';
import { EmptyState, SimulationBanner } from '@design-system/feedback';
import { ScreenHeader } from '@design-system/navigation';
import { Typography } from '@design-system/primitives';
import { ScreenContainer, SectionCard } from '@design-system/surfaces';
import { translate } from '@shared/localization';
import { AppointmentDetailSkeleton } from '../../components/AppointmentDetailSkeleton';
import { AppointmentStatusBadge } from '../../components/AppointmentStatusBadge';
import { PreparationList } from '../../components/PreparationList';
import { useAppointmentDetail } from '../../hooks/useAppointmentDetail';
import type { AppointmentDetailScreenProps } from './AppointmentDetailScreen.types';
import { AppointmentActions } from './components/AppointmentActions';
import { AppointmentInfoCard } from './components/AppointmentInfoCard';
import { AppointmentNotice } from './components/AppointmentNotice';
import { CancelAppointmentDialog } from './components/CancelAppointmentDialog';

export function AppointmentDetailScreen({
  repository,
  clock,
  appointmentId,
  onBack,
  onReschedule,
  onCheckedIn,
}: AppointmentDetailScreenProps) {
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
        <AppointmentDetailSkeleton />
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
      <AppointmentNotice notice={detail.notice} />
      <AppointmentInfoCard appointment={appointment} />

      {isActive ? (
        <>
          <SectionCard title={translate('appointments.detail.preparation')}>
            <PreparationList items={appointment.preparation} />
          </SectionCard>
          <AppointmentActions
            appointment={appointment}
            canCheckIn={detail.canCheckIn}
            checkingIn={detail.busy === 'check_in'}
            changeBlockReason={detail.changeBlockReason}
            onCheckIn={handleCheckIn}
            onReschedule={() => onReschedule(appointment.id)}
            onRequestCancel={() => setConfirmingCancel(true)}
          />
        </>
      ) : null}

      <Typography variant="caption" tone="secondary">
        {translate('appointments.detail.simulatedNote')}
      </Typography>

      <CancelAppointmentDialog
        visible={confirmingCancel}
        startsAt={appointment.startsAt}
        loading={detail.busy === 'cancel'}
        onConfirm={handleCancel}
        onCancel={() => setConfirmingCancel(false)}
      />
    </ScreenContainer>
  );
}
