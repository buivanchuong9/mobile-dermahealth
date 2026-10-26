import type { SkinConcern } from '../../../domain/value-objects/SkinConcern';

export type SkinConcernCardProps = {
  readonly concern: SkinConcern;
  readonly selected: boolean;
  readonly onToggle: (concern: SkinConcern) => void;
  readonly disabled?: boolean;
};
