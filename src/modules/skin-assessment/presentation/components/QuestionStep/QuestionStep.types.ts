import type {
  AssessmentDraft,
  Severity,
  SkinArea,
  SkinSymptom,
  SymptomDuration,
} from '../../../domain/entities/Assessment';
import type { QuestionId } from '../../../domain/rules/assessmentRules';

export type QuestionStepProps = {
  readonly questionIndex: number;
  readonly draft: AssessmentDraft;
  readonly unanswered: QuestionId | null;
  readonly onSelectArea: (value: SkinArea) => void;
  readonly onSelectDuration: (value: SymptomDuration) => void;
  readonly onToggleSymptom: (value: SkinSymptom) => void;
  readonly onSelectSeverity: (value: Severity) => void;
  readonly onNext: () => void;
};
