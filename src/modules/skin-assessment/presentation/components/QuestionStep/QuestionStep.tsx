import { Button, Typography } from '@design-system/primitives';
import { translate } from '@shared/localization';
import { QUESTION_ORDER } from '../../../domain/rules/assessmentRules';
import { AreaQuestion } from './components/AreaQuestion';
import { DurationQuestion } from './components/DurationQuestion';
import { QuestionProgress } from './components/QuestionProgress';
import { SeverityQuestion } from './components/SeverityQuestion';
import { SymptomsQuestion } from './components/SymptomsQuestion';
import type { QuestionStepProps } from './QuestionStep.types';

/** One question of the assessment, chosen by `questionIndex`. */
export function QuestionStep(props: QuestionStepProps) {
  const question = QUESTION_ORDER[props.questionIndex] ?? 'area';
  const total = QUESTION_ORDER.length;
  const last = props.questionIndex === total - 1;

  return (
    <>
      <QuestionProgress current={props.questionIndex + 1} total={total} />

      <Typography variant="title" accessibilityRole="header">
        {translate(`assessment.questions.${question}.title`)}
      </Typography>

      {question === 'area' ? (
        <AreaQuestion value={props.draft.area} onSelect={props.onSelectArea} />
      ) : null}
      {question === 'duration' ? (
        <DurationQuestion
          value={props.draft.duration}
          onSelect={props.onSelectDuration}
        />
      ) : null}
      {question === 'symptoms' ? (
        <SymptomsQuestion
          selected={props.draft.symptoms}
          onToggle={props.onToggleSymptom}
        />
      ) : null}
      {question === 'severity' ? (
        <SeverityQuestion
          value={props.draft.severity}
          onSelect={props.onSelectSeverity}
        />
      ) : null}

      {props.unanswered === question ? (
        <Typography variant="caption" tone="error" accessibilityRole="alert">
          {translate(`assessment.questions.errors.${question}`)}
        </Typography>
      ) : null}

      <Button
        label={translate(
          last ? 'assessment.questions.submit' : 'assessment.questions.next',
        )}
        onPress={props.onNext}
        fullWidth
        size="lg"
        testID="assessment-next"
      />
    </>
  );
}
