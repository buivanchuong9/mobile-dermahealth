import type { QueueGuidance, QueueStage } from '../entities/Queue';

/** Minutes the simulation assumes each patient ahead takes. */
export const MINUTES_PER_PATIENT = 6;
/** How many patients ahead still count as "turn is coming up". */
export const UPCOMING_THRESHOLD = 2;

export type QueueProgress = {
  readonly stage: QueueStage;
  readonly calledSequence: number;
  readonly aheadCount: number;
  readonly estimatedWaitMinutes: number;
  readonly guidance: QueueGuidance;
};

/**
 * Pure model of the simulated queue. `progress` counts simulation steps since
 * the ticket was issued: patients are called one by one, then the ticket is
 * called, then consultation starts, then completes.
 */
export function deriveQueueProgress(input: {
  readonly ticketSequence: number;
  readonly startSequence: number;
  readonly progress: number;
}): QueueProgress {
  const stepsToCall = input.ticketSequence - input.startSequence;
  const calledSequence = Math.min(
    input.ticketSequence,
    input.startSequence + input.progress,
  );
  const aheadCount = Math.max(0, input.ticketSequence - calledSequence - 1);

  if (input.progress > stepsToCall + 1) {
    return {
      stage: 'completed',
      calledSequence,
      aheadCount: 0,
      estimatedWaitMinutes: 0,
      guidance: 'done',
    };
  }
  if (input.progress === stepsToCall + 1) {
    return {
      stage: 'in_consultation',
      calledSequence,
      aheadCount: 0,
      estimatedWaitMinutes: 0,
      guidance: 'in_consultation',
    };
  }
  if (input.progress === stepsToCall) {
    return {
      stage: 'called',
      calledSequence,
      aheadCount: 0,
      estimatedWaitMinutes: 0,
      guidance: 'go_to_room',
    };
  }
  const upcoming = aheadCount <= UPCOMING_THRESHOLD;
  return {
    stage: upcoming ? 'upcoming' : 'waiting',
    calledSequence,
    aheadCount,
    estimatedWaitMinutes: (aheadCount + 1) * MINUTES_PER_PATIENT,
    guidance: upcoming ? 'prepare' : 'wait',
  };
}

export function formatTicketNumber(sequence: number): string {
  return `A-${String(sequence).padStart(3, '0')}`;
}

export const isTicketFinished = (stage: QueueStage): boolean =>
  stage === 'completed';
