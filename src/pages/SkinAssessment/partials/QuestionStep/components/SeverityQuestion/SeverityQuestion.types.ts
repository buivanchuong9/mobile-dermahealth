import type { Severity } from '../../../../../../model/skinAssessment/Assessment';

export type SeverityQuestionProps = {
  readonly value: Severity | null;
  readonly onSelect: (value: Severity) => void;
};
