import type { NextJourneyAction } from '../../../domain/entities/CareJourney';

export type NextActionCardProps = {
  readonly action: NextJourneyAction;
  readonly onPress: () => void;
};
