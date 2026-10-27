import type { AiAssessmentRecord } from '../../../../../model/medicalRecords/RecordEntry';

export type AiAssessmentDetailsProps = {
  readonly entry: AiAssessmentRecord;
  readonly onBookVisit: () => void;
};
