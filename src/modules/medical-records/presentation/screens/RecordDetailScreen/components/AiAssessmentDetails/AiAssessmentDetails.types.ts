import type { AiAssessmentRecord } from '../../../../../domain/entities/RecordEntry';

export type AiAssessmentDetailsProps = {
  readonly entry: AiAssessmentRecord;
  readonly onBookVisit: () => void;
};
