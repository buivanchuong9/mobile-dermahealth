import type { Severity } from '../../../../../domain/entities/Assessment';

export type SeverityQuestionProps = {
  readonly value: Severity | null;
  readonly onSelect: (value: Severity) => void;
};
