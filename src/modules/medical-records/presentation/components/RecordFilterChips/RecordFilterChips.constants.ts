import type { RecordFilter } from '../../../domain/entities/RecordEntry';

export const FILTERS: readonly RecordFilter[] = [
  'all',
  'clinician_confirmed',
  'patient_reported',
  'ai_generated',
];
