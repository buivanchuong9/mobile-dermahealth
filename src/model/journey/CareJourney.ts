export const JOURNEY_STEP_IDS = [
  'booked',
  'check_in',
  'waiting',
  'consultation',
  'tests',
  'prescription',
  'completion',
  'follow_up',
] as const;

export type JourneyStepId = (typeof JOURNEY_STEP_IDS)[number];
export type JourneyStepStatus =
  | 'completed'
  | 'current'
  | 'upcoming'
  | 'blocked';

export type JourneyStep = {
  readonly id: JourneyStepId;
  readonly status: JourneyStepStatus;
};

export type NextJourneyAction =
  | 'prepare_visit'
  | 'check_in'
  | 'wait_in_queue'
  | 'prepare_to_go'
  | 'go_to_room'
  | 'in_consultation'
  | 'review_care_instructions'
  | 'book_follow_up';

export type CareJourney = {
  readonly appointmentId: string;
  readonly steps: readonly JourneyStep[];
  readonly nextAction: NextJourneyAction;
};
