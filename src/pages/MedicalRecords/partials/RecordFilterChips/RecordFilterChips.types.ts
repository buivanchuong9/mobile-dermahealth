import type { RecordFilter } from '../../../../model/medicalRecords/RecordEntry';

export type RecordFilterChipsProps = {
  readonly value: RecordFilter;
  readonly onChange: (filter: RecordFilter) => void;
};
