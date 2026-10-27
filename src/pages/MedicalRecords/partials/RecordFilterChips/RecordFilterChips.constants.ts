import type { RecordFilter } from '../../../../model/medicalRecords/RecordEntry';

export const FILTERS: readonly RecordFilter[] = [
  'all',
  'clinician_confirmed',
  'patient_reported',
  'ai_generated',
];
