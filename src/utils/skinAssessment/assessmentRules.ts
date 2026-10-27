import { err, ok } from '@model/common';
import type { Result } from '@model/common';
import type {
  AssessmentAnswers,
  AssessmentDraft,
  AssessmentFinding,
  FindingId,
  FitLevel,
  Severity,
  SkinSymptom,
  Urgency,
} from '../../model/skinAssessment/Assessment';

export type QuestionId = 'area' | 'duration' | 'symptoms' | 'severity';
export const QUESTION_ORDER: readonly QuestionId[] = [
  'area',
  'duration',
  'symptoms',
  'severity',
];

export function isQuestionAnswered(
  draft: AssessmentDraft,
  question: QuestionId,
): boolean {
  switch (question) {
    case 'area':
      return draft.area !== null;
    case 'duration':
      return draft.duration !== null;
    case 'symptoms':
      return draft.symptoms.length > 0;
    case 'severity':
      return draft.severity !== null;
  }
}

export function validateAnswers(
  draft: AssessmentDraft,
): Result<AssessmentAnswers, readonly QuestionId[]> {
  const missing = QUESTION_ORDER.filter(
    question => !isQuestionAnswered(draft, question),
  );
  if (missing.length > 0 || !draft.area || !draft.duration || !draft.severity) {
    return err(missing);
  }
  return ok({
    area: draft.area,
    duration: draft.duration,
    symptoms: draft.symptoms,
    severity: draft.severity,
  });
}

const FINDING_ORDER: readonly FindingId[] = [
  'dry_skin_pattern',
  'acne_pattern',
  'irritation_pattern',
  'pigmentation_pattern',
];

type Weights = Partial<Record<FindingId, number>>;

const SYMPTOM_WEIGHTS: Record<SkinSymptom, Weights> = {
  dryness: { dry_skin_pattern: 3, irritation_pattern: 1 },
  scaling: { dry_skin_pattern: 2, irritation_pattern: 1 },
  itching: { irritation_pattern: 2, dry_skin_pattern: 1 },
  redness: { irritation_pattern: 2, acne_pattern: 1 },
  bumps: { acne_pattern: 3, irritation_pattern: 1 },
  oiliness: { acne_pattern: 2 },
  dark_spots: { pigmentation_pattern: 3 },
  pain: { acne_pattern: 1, irritation_pattern: 1 },
};

const SPECIALTY_BY_FINDING = {
  dry_skin_pattern: 'general',
  acne_pattern: 'acne',
  irritation_pattern: 'allergy',
  pigmentation_pattern: 'aesthetic',
} as const;

const toFit = (score: number): FitLevel =>
  score >= 5 ? 'high' : score >= 3 ? 'moderate' : 'low';

const MAX_FINDINGS = 2;

export function deriveFindings(
  answers: AssessmentAnswers,
): readonly AssessmentFinding[] {
  const scores = new Map<FindingId, number>();
  for (const symptom of answers.symptoms) {
    for (const [id, weight] of Object.entries(SYMPTOM_WEIGHTS[symptom]) as [
      FindingId,
      number,
    ][]) {
      scores.set(id, (scores.get(id) ?? 0) + weight);
    }
  }
  return FINDING_ORDER.filter(id => (scores.get(id) ?? 0) > 0)
    .sort((a, b) => (scores.get(b) ?? 0) - (scores.get(a) ?? 0))
    .slice(0, MAX_FINDINGS)
    .map(id => ({ id, fit: toFit(scores.get(id) ?? 0) }));
}

export function deriveUrgency(answers: AssessmentAnswers): Urgency {
  const severity: Severity = answers.severity;
  if (
    severity === 'severe' ||
    (answers.symptoms.includes('pain') && severity !== 'mild')
  ) {
    return 'prompt';
  }
  if (
    severity === 'moderate' ||
    answers.duration === 'months' ||
    answers.duration === 'longer'
  ) {
    return 'soon';
  }
  return 'routine';
}

export function suggestSpecialty(findings: readonly AssessmentFinding[]) {
  const top = findings[0];
  return top ? SPECIALTY_BY_FINDING[top.id] : 'general';
}
