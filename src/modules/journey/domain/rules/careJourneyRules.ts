import { canCheckIn, isActive } from '@modules/appointments';
import type { Appointment } from '@modules/appointments';
import type { QueueSnapshot } from '@modules/queue';
import { compareLocal } from '@shared/utilities/localDateTime';
import type { LocalDateTime } from '@shared/utilities/localDateTime';
import { JOURNEY_STEP_IDS } from '../entities/CareJourney';
import type {
  CareJourney,
  JourneyStep,
  NextJourneyAction,
} from '../entities/CareJourney';

const INDEX = {
  checkIn: 1,
  waiting: 2,
  consultation: 3,
  followUp: 7,
} as const;

const TESTS_INDEX = 4;

/**
 * The appointment the journey describes: the one holding the queue ticket,
 * otherwise the nearest upcoming in-person appointment.
 */
export function selectJourneyAppointment(
  appointments: readonly Appointment[],
  queue: QueueSnapshot | null,
): Appointment | null {
  if (queue !== null) {
    const ticketed = appointments.find(
      item => item.id === queue.ticket.appointmentId,
    );
    if (ticketed) {
      return ticketed;
    }
  }
  return (
    [...appointments]
      .filter(item => isActive(item) && item.consultationType === 'in_person')
      .sort((a, b) => compareLocal(a.startsAt, b.startsAt))[0] ?? null
  );
}

function currentIndex(
  appointment: Appointment,
  queue: QueueSnapshot | null,
): number {
  const ticketed =
    queue !== null && queue.ticket.appointmentId === appointment.id;
  if (ticketed) {
    switch (queue.stage) {
      case 'waiting':
      case 'upcoming':
        return INDEX.waiting;
      case 'called':
      case 'in_consultation':
        return INDEX.consultation;
      case 'completed':
        return INDEX.followUp;
    }
  }
  if (appointment.status === 'completed') {
    return INDEX.followUp;
  }
  return appointment.status === 'checked_in' ? INDEX.waiting : INDEX.checkIn;
}

function nextActionFor(
  appointment: Appointment,
  queue: QueueSnapshot | null,
  index: number,
  now: LocalDateTime,
): NextJourneyAction {
  if (index === INDEX.followUp) {
    return queue?.stage === 'completed'
      ? 'review_care_instructions'
      : 'book_follow_up';
  }
  if (index === INDEX.consultation) {
    return queue?.stage === 'in_consultation'
      ? 'in_consultation'
      : 'go_to_room';
  }
  if (index === INDEX.waiting) {
    return queue?.stage === 'upcoming' ? 'prepare_to_go' : 'wait_in_queue';
  }
  return canCheckIn(appointment, now) ? 'check_in' : 'prepare_visit';
}

export function buildCareJourney(input: {
  readonly appointment: Appointment;
  readonly queue: QueueSnapshot | null;
  readonly now: LocalDateTime;
}): CareJourney {
  const index = currentIndex(input.appointment, input.queue);
  const steps: JourneyStep[] = JOURNEY_STEP_IDS.map((id, position) => {
    if (id === 'tests') {
      return { id, status: index < TESTS_INDEX + 1 ? 'blocked' : 'completed' };
    }
    if (position < index) {
      return { id, status: 'completed' };
    }
    return { id, status: position === index ? 'current' : 'upcoming' };
  });
  return {
    appointmentId: input.appointment.id,
    steps,
    nextAction: nextActionFor(input.appointment, input.queue, index, input.now),
  };
}
