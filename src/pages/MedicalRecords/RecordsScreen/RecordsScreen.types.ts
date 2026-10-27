import type { RecordRepository } from '../../../model/medicalRecords/RecordRepository';

export type RecordsScreenProps = {
  readonly repository: RecordRepository;
  readonly onOpenRecord: (recordId: string) => void;
};
