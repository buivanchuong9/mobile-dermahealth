import type { NextJourneyAction } from '../../../../model/journey/CareJourney';

export type NextActionCardProps = {
  readonly action: NextJourneyAction;
  readonly onPress: () => void;
};
