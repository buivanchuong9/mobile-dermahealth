import { addDays, toDateKey } from '@shared/utilities/localDateTime';
import type { LocalDateTime } from '@shared/utilities/localDateTime';
import type { AssessmentResult } from '../../domain/entities/Assessment';

/** Two earlier simulated suggestions, dated relative to the demo "today". */
export function createSeedAssessments(now: LocalDateTime): AssessmentResult[] {
  const today = toDateKey(now);
  return [
    {
      id: 'assessment-seed-1',
      createdAt: `${addDays(today, -10)}T21:00`,
      origin: 'simulated',
      findings: [{ id: 'dry_skin_pattern', fit: 'moderate' }],
      urgency: 'routine',
      suggestedSpecialtyId: 'general',
    },
    {
      id: 'assessment-seed-2',
      createdAt: `${addDays(today, -62)}T20:30`,
      origin: 'simulated',
      findings: [
        { id: 'acne_pattern', fit: 'high' },
        { id: 'irritation_pattern', fit: 'low' },
      ],
      urgency: 'soon',
      suggestedSpecialtyId: 'acne',
    },
  ];
}
