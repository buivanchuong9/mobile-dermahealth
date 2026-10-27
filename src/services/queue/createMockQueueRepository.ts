import { createAppError, err, ok } from '@model/common';
import type { Result, AppError } from '@model/common';
import type { DemoClock } from '@utils/clock';
import type {
  IssueTicketRequest,
  QueueEvent,
  QueueSnapshot,
  QueueTicket,
} from '../../model/queue/Queue';
import type { QueueRepository } from '../../model/queue/QueueRepository';
import {
  deriveQueueProgress,
  formatTicketNumber,
} from '../../utils/queue/queueRules';

const TICKET_SEQUENCE = 24;
const PATIENTS_AHEAD_AT_START = 5;
const START_SEQUENCE = TICKET_SEQUENCE - PATIENTS_AHEAD_AT_START - 1;
const MINUTES_PER_STEP = 2;

/**
 * Simulated queue for one ticket. Time only advances when `advance()` is
 * called, so every run is identical. No clinic system is involved.
 */
export function createMockQueueRepository(clock: DemoClock): QueueRepository {
  let ticket: QueueTicket | null = null;
  let progress = 0;
  let lastUpdatedAt = clock.now();
  const listeners = new Set<() => void>();
  const eventListeners = new Set<(event: QueueEvent) => void>();

  const snapshot = (): QueueSnapshot | null => {
    if (ticket === null) {
      return null;
    }
    const derived = deriveQueueProgress({
      ticketSequence: TICKET_SEQUENCE,
      startSequence: START_SEQUENCE,
      progress,
    });
    return {
      ticket,
      stage: derived.stage,
      currentlyCalledNumber: formatTicketNumber(derived.calledSequence),
      aheadCount: derived.aheadCount,
      estimatedWaitMinutes: derived.estimatedWaitMinutes,
      lastUpdatedAt,
      guidance: derived.guidance,
    };
  };

  const notify = () => listeners.forEach(listener => listener());
  const emit = (event: QueueEvent) =>
    eventListeners.forEach(listener => listener(event));

  const requireSnapshot = (): Result<QueueSnapshot, AppError> => {
    const current = snapshot();
    return current
      ? ok(current)
      : err(createAppError('not_found', 'No active queue ticket'));
  };

  return {
    async getSnapshot() {
      return ok(snapshot());
    },

    async issueTicket(request: IssueTicketRequest) {
      if (ticket === null || ticket.appointmentId !== request.appointmentId) {
        progress = 0;
        lastUpdatedAt = clock.now();
        ticket = {
          number: formatTicketNumber(TICKET_SEQUENCE),
          appointmentId: request.appointmentId,
          clinicName: request.clinicName,
          department: request.department,
          room: request.room,
          issuedAt: clock.now(),
        };
        notify();
      }
      return requireSnapshot();
    },

    async advance() {
      const before = snapshot();
      if (before === null) {
        return requireSnapshot();
      }
      if (before.stage === 'completed') {
        return ok(before);
      }
      progress += 1;
      clock.advanceMinutes(MINUTES_PER_STEP);
      lastUpdatedAt = clock.now();
      const after = snapshot();
      if (after === null) {
        return requireSnapshot();
      }
      if (before.stage === 'waiting' && after.stage === 'upcoming') {
        emit({
          kind: 'upcoming_turn',
          ticketNumber: after.ticket.number,
          room: after.ticket.room,
        });
      }
      if (before.stage !== 'called' && after.stage === 'called') {
        emit({
          kind: 'turn_called',
          ticketNumber: after.ticket.number,
          room: after.ticket.room,
        });
      }
      notify();
      return ok(after);
    },

    async reset() {
      ticket = null;
      progress = 0;
      clock.reset();
      lastUpdatedAt = clock.now();
      notify();
      return ok(undefined);
    },

    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },

    onEvent(listener) {
      eventListeners.add(listener);
      return () => {
        eventListeners.delete(listener);
      };
    },
  };
}
