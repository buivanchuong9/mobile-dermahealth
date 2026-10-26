import { createAppError, err, ok } from '@core/contracts';
import type { Clock } from '@core/contracts';
import type { SkinAssessmentService } from '../../domain/services/SkinAssessmentService';
import {
  deriveFindings,
  deriveUrgency,
  suggestSpecialty,
} from '../../domain/rules/assessmentRules';

const DEFAULT_DURATION_MS = 2400;

export type MockSkinAssessmentOptions = { readonly durationMs?: number };

/** Rule-based simulation. No model, no network, no image input. */
export function createMockSkinAssessmentService(
  clock: Clock,
  { durationMs = DEFAULT_DURATION_MS }: MockSkinAssessmentOptions = {},
): SkinAssessmentService {
  let sequence = 1;
  return {
    async assess(answers) {
      await new Promise<void>(resolve => setTimeout(resolve, durationMs));
      const findings = deriveFindings(answers);
      if (findings.length === 0) {
        return err(
          createAppError('validation', 'No pattern matched the answers'),
        );
      }
      return ok({
        id: `assessment-new-${sequence++}`,
        createdAt: clock.now(),
        origin: 'simulated' as const,
        findings,
        urgency: deriveUrgency(answers),
        suggestedSpecialtyId: suggestSpecialty(findings),
      });
    },
  };
}
