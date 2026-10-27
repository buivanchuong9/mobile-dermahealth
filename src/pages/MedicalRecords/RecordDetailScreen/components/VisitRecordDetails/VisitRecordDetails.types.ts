import type { VisitRecord } from '../../../../../model/medicalRecords/RecordEntry';

export type VisitRecordDetailsProps = {
  readonly visit: VisitRecord;
  readonly onBookFollowUp: (visit: VisitRecord) => void;
};
