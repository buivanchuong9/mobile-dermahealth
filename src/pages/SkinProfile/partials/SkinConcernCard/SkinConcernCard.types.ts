import type { SkinConcern } from '../../../../model/skinProfile/SkinConcern';

export type SkinConcernCardProps = {
  readonly concern: SkinConcern;
  readonly selected: boolean;
  readonly onToggle: (concern: SkinConcern) => void;
  readonly disabled?: boolean;
};
