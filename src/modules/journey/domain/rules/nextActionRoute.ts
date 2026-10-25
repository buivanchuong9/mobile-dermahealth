import type { NextJourneyAction } from '../entities/CareJourney';

/** Where the app should take the patient for a given next action. */
export type NextActionRoute =
  | 'appointment_detail'
  | 'check_in'
  | 'queue'
  | 'records'
  | 'booking';

export function routeForNextAction(action: NextJourneyAction): NextActionRoute {
  switch (action) {
    case 'prepare_visit':
      return 'appointment_detail';
    case 'check_in':
      return 'check_in';
    case 'wait_in_queue':
    case 'prepare_to_go':
    case 'go_to_room':
    case 'in_consultation':
      return 'queue';
    case 'review_care_instructions':
      return 'records';
    case 'book_follow_up':
      return 'booking';
  }
}
