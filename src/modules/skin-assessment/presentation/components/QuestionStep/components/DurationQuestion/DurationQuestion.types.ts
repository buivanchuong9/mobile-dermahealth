import type { SymptomDuration } from '../../../../../domain/entities/Assessment';

export type DurationQuestionProps = {
  readonly value: SymptomDuration | null;
  readonly onSelect: (value: SymptomDuration) => void;
};
