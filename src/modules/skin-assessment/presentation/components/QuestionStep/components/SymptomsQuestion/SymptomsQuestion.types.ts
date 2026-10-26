import type { SkinSymptom } from '../../../../../domain/entities/Assessment';

export type SymptomsQuestionProps = {
  readonly selected: readonly SkinSymptom[];
  readonly onToggle: (value: SkinSymptom) => void;
};
