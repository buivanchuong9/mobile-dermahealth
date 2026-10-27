import type { StatusTone } from '@components/data-display';
import type { IconName } from '@components/primitives';
import type { RecordSource } from '../../../../model/medicalRecords/RecordEntry';

export const PRESENTATION: Record<
  RecordSource,
  { tone: StatusTone; icon: IconName }
> = {
  clinician_confirmed: { tone: 'success', icon: 'shield-check' },
  patient_reported: { tone: 'neutral', icon: 'user' },
  ai_generated: { tone: 'warning', icon: 'sparkles' },
};
