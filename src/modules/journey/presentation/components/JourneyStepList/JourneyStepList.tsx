import { View } from 'react-native';
import type { Appointment } from '@modules/appointments';
import type { QueueSnapshot } from '@modules/queue';
import { Card } from '@design-system/surfaces';
import { TimelineItem } from '@design-system/data-display';
import { translate } from '@shared/localization';
import { formatTime } from '@shared/utilities/localDateTime';
import type {
  CareJourney,
  JourneyStep,
} from '../../../domain/entities/CareJourney';

export type JourneyStepListProps = {
  readonly journey: CareJourney;
  readonly appointment: Appointment;
  readonly queue: QueueSnapshot | null;
};

function describe(
  step: JourneyStep,
  appointment: Appointment,
  queue: QueueSnapshot | null,
) {
  switch (step.id) {
    case 'booked':
      return {
        description: translate('journey.steps.booked.description', {
          time: formatTime(appointment.startsAt),
          doctor: appointment.doctorName,
        }),
      };
    case 'check_in':
      return {
        description: translate('journey.steps.check_in.description'),
        meta: translate('journey.steps.check_in.location'),
      };
    case 'waiting':
      return {
        description:
          queue !== null && step.status === 'current'
            ? translate('journey.steps.waiting.waitingDescription', {
                ticket: queue.ticket.number,
                ahead: queue.aheadCount,
              })
            : translate('journey.steps.waiting.defaultDescription'),
      };
    case 'consultation':
      return {
        description: translate('journey.steps.consultation.description'),
        meta: appointment.room,
      };
    case 'tests':
      return {
        description: translate(
          step.status === 'blocked'
            ? 'journey.steps.tests.blockedDescription'
            : 'journey.steps.tests.doneDescription',
        ),
      };
    case 'prescription':
      return {
        description: translate('journey.steps.prescription.description'),
      };
    case 'completion':
      return { description: translate('journey.steps.completion.description') };
    case 'follow_up':
      return { description: translate('journey.steps.follow_up.description') };
  }
}

export function JourneyStepList({
  journey,
  appointment,
  queue,
}: JourneyStepListProps) {
  return (
    <Card testID="journey-steps">
      <View>
        {journey.steps.map((step, index) => {
          const { description, meta } = describe(step, appointment, queue);
          return (
            <TimelineItem
              key={step.id}
              status={step.status}
              statusLabel={translate(`journey.status.${step.status}`)}
              title={translate(`journey.steps.${step.id}.title`)}
              description={description}
              meta={meta}
              isLast={index === journey.steps.length - 1}
              testID={`journey-step-${step.id}`}
            />
          );
        })}
      </View>
    </Card>
  );
}
