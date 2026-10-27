import type { StatusTone } from '@components/data-display';
import type { Urgency } from '../../../model/skinAssessment/Assessment';

export const URGENCY_TONE: Record<Urgency, StatusTone> = {
  routine: 'info',
  soon: 'warning',
  prompt: 'danger',
};
