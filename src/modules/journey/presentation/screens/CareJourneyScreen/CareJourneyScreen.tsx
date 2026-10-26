import {
  EmptyState,
  SimulationBanner,
  SkeletonCard,
} from '@design-system/feedback';
import { FadeInView } from '@design-system/motion';
import { ScreenHeader } from '@design-system/navigation';
import { Typography } from '@design-system/primitives';
import { ScreenContainer } from '@design-system/surfaces';
import { formatAppointmentWhen } from '@modules/appointments';
import { translate } from '@shared/localization';
import { JourneyStepList } from '../../components/JourneyStepList';
import { NextActionCard } from '../../components/NextActionCard';
import { useCareJourney } from '../../hooks/useCareJourney';
import type { CareJourneyScreenProps } from './CareJourneyScreen.types';

export function CareJourneyScreen({
  appointmentRepository,
  queueRepository,
  clock,
  onBookAppointment,
  onNextAction,
}: CareJourneyScreenProps) {
  const query = useCareJourney(appointmentRepository, queueRepository, clock);
  const header = (
    <ScreenHeader
      title={translate('journey.title')}
      subtitle={translate('journey.subtitle')}
    />
  );

  if (query.status === 'loading') {
    return (
      <ScreenContainer header={header} bottomInset={false}>
        <SkeletonCard lines={3} />
        <SkeletonCard lines={5} />
      </ScreenContainer>
    );
  }

  if (query.status === 'error') {
    return (
      <ScreenContainer header={header} bottomInset={false}>
        <EmptyState
          icon="triangle-alert"
          title={translate('common.loadFailedTitle')}
          description={translate('common.loadFailedBody')}
          actionLabel={translate('common.retry')}
          onAction={query.reload}
        />
      </ScreenContainer>
    );
  }

  if (query.data === null) {
    return (
      <ScreenContainer header={header} bottomInset={false}>
        <SimulationBanner />
        <EmptyState
          icon="route"
          title={translate('journey.empty.title')}
          description={translate('journey.empty.description')}
          actionLabel={translate('journey.empty.action')}
          onAction={onBookAppointment}
          testID="journey-empty"
        />
      </ScreenContainer>
    );
  }

  const { appointment, queue, journey } = query.data;
  return (
    <ScreenContainer header={header} bottomInset={false}>
      <SimulationBanner />
      <Typography variant="caption" tone="secondary">
        {translate('journey.forAppointment', {
          when: formatAppointmentWhen(appointment.startsAt),
          doctor: appointment.doctorName,
        })}
      </Typography>
      <FadeInView>
        <NextActionCard
          action={journey.nextAction}
          onPress={() => onNextAction(journey.nextAction, appointment)}
        />
      </FadeInView>
      <JourneyStepList
        journey={journey}
        appointment={appointment}
        queue={queue}
      />
    </ScreenContainer>
  );
}
