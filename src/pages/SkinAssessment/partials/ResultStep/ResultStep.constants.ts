import type { StatusTone } from '@components/data-display';
import type {
  FitLevel,
  Urgency,
} from '../../../../model/skinAssessment/Assessment';

export const URGENCY_TONE: Record<Urgency, StatusTone> = {
  routine: 'info',
  soon: 'warning',
  prompt: 'danger',
};

export const FIT_TONE: Record<FitLevel, StatusTone> = {
  low: 'neutral',
  moderate: 'info',
  high: 'warning',
};
