import type { RecordFilter } from '../../../domain/entities/RecordEntry';

export type RecordFilterChipsProps = {
  readonly value: RecordFilter;
  readonly onChange: (filter: RecordFilter) => void;
};
