import type { VisitRecord } from '../../../model/medicalRecords/RecordEntry';
import type { RecordRepository } from '../../../model/medicalRecords/RecordRepository';

export type RecordDetailScreenProps = {
  readonly repository: RecordRepository;
  readonly recordId: string;
  readonly onBack: () => void;
  readonly onBookFollowUp: (visit: VisitRecord) => void;
  readonly onBookVisit: () => void;
};
