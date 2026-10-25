import { ok } from '@core/contracts';
import type { Clock } from '@core/contracts';
import {
  addDays,
  compareLocal,
  toDateKey,
} from '@shared/utilities/localDateTime';
import type { AssessmentResult } from '../domain/entities/Assessment';
import type { AssessmentHistoryRepository } from '../domain/repositories/AssessmentHistoryRepository';

export function createMockAssessmentHistoryRepository(
  clock: Clock,
): AssessmentHistoryRepository {
  const today = toDateKey(clock.now());
  let items: AssessmentResult[] = [
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
  const listeners = new Set<() => void>();

  return {
    async list() {
      return ok(
        [...items].sort((a, b) => compareLocal(b.createdAt, a.createdAt)),
      );
    },
    async add(result) {
      items = [result, ...items];
      listeners.forEach(listener => listener());
      return ok(undefined);
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}
