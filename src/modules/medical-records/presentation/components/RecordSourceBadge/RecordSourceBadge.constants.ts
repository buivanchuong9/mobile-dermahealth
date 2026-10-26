import type { StatusTone } from '@design-system/data-display';
import type { IconName } from '@design-system/primitives';
import type { RecordSource } from '../../../domain/entities/RecordEntry';

export const PRESENTATION: Record<
  RecordSource,
  { tone: StatusTone; icon: IconName }
> = {
  clinician_confirmed: { tone: 'success', icon: 'shield-check' },
  patient_reported: { tone: 'neutral', icon: 'user' },
  ai_generated: { tone: 'warning', icon: 'sparkles' },
};
