import type { SkinArea } from '../../../../../domain/entities/Assessment';

export type AreaQuestionProps = {
  readonly value: SkinArea | null;
  readonly onSelect: (value: SkinArea) => void;
};
