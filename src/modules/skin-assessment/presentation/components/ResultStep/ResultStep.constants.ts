import type { StatusTone } from '@design-system/data-display';
import type { FitLevel, Urgency } from '../../../domain/entities/Assessment';

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
