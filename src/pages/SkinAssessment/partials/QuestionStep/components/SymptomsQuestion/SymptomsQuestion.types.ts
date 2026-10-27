import type { SkinSymptom } from '../../../../../../model/skinAssessment/Assessment';

export type SymptomsQuestionProps = {
  readonly selected: readonly SkinSymptom[];
  readonly onToggle: (value: SkinSymptom) => void;
};
