import type { SkinConcern } from '../../../../../model/skinProfile/SkinConcern';

export type SkinConcernSectionProps = {
  readonly selected: readonly SkinConcern[];
  readonly onToggle: (concern: SkinConcern) => void;
  readonly disabled: boolean;
};
