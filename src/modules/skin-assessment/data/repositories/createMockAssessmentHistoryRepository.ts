import { ok } from '@core/contracts';
import type { Clock } from '@core/contracts';
import { compareLocal } from '@shared/utilities/localDateTime';
import type { AssessmentResult } from '../../domain/entities/Assessment';
import type { AssessmentHistoryRepository } from '../../domain/repositories/AssessmentHistoryRepository';
import { createSeedAssessments } from '../mock/assessmentHistory.mock';

export function createMockAssessmentHistoryRepository(
  clock: Clock,
): AssessmentHistoryRepository {
  let items: AssessmentResult[] = createSeedAssessments(clock.now());
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
