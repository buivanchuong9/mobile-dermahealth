import { FadeInView } from '@components/motion';
import { Button, Typography } from '@components/primitives';
import { useTheme } from '@styles/theme';
import { translate } from '@i18n';
import { QUESTION_ORDER } from '../../../../utils/skinAssessment/assessmentRules';
import { AreaQuestion } from './components/AreaQuestion';
import { DurationQuestion } from './components/DurationQuestion';
import { QuestionProgress } from './components/QuestionProgress';
import { SeverityQuestion } from './components/SeverityQuestion';
import { SymptomsQuestion } from './components/SymptomsQuestion';
import type { QuestionStepProps } from './QuestionStep.types';

/** One question of the assessment, chosen by `questionIndex`. */
export function QuestionStep(props: QuestionStepProps) {
  const theme = useTheme();
  const questionGap = { gap: theme.spacing[4] };
  const question = QUESTION_ORDER[props.questionIndex] ?? 'area';
  const total = QUESTION_ORDER.length;
  const last = props.questionIndex === total - 1;

  return (
    <>
      <QuestionProgress current={props.questionIndex + 1} total={total} />

      <FadeInView
        key={question}
        variant="rise"
        duration="fast"
        style={questionGap}
      >
        <Typography variant="title" accessibilityRole="header">
          {translate(`assessment.questions.${question}.title`)}
        </Typography>

        {question === 'area' ? (
          <AreaQuestion
            value={props.draft.area}
            onSelect={props.onSelectArea}
          />
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
      </FadeInView>

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
