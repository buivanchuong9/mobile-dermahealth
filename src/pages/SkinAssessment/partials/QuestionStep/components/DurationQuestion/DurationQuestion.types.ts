import type { SymptomDuration } from '../../../../../../model/skinAssessment/Assessment';

export type DurationQuestionProps = {
  readonly value: SymptomDuration | null;
  readonly onSelect: (value: SymptomDuration) => void;
};
