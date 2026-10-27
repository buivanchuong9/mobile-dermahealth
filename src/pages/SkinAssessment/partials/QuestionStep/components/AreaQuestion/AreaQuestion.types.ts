import type { SkinArea } from '../../../../../../model/skinAssessment/Assessment';

export type AreaQuestionProps = {
  readonly value: SkinArea | null;
  readonly onSelect: (value: SkinArea) => void;
};
