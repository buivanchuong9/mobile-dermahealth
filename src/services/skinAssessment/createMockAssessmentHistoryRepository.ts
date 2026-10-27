import { ok } from '@model/common';
import type { Clock } from '@model/common';
import { compareLocal } from '@utils/localDateTime';
import type { AssessmentResult } from '../../model/skinAssessment/Assessment';
import type { AssessmentHistoryRepository } from '../../model/skinAssessment/AssessmentHistoryRepository';
import { createSeedAssessments } from '../../mocks/skinAssessment/assessmentHistory.mock';

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
