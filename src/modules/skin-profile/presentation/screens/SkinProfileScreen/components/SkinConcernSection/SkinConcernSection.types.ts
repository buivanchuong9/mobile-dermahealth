import type { SkinConcern } from '../../../../../domain/value-objects/SkinConcern';

export type SkinConcernSectionProps = {
  readonly selected: readonly SkinConcern[];
  readonly onToggle: (concern: SkinConcern) => void;
  readonly disabled: boolean;
};
