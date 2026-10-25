import { StyleSheet, View } from 'react-native';
import { ProgressBar } from '@design-system/feedback';
import { SelectableCard } from '@design-system/inputs';
import { Button, Typography } from '@design-system/primitives';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import {
  SEVERITIES,
  SKIN_AREAS,
  SKIN_SYMPTOMS,
  SYMPTOM_DURATIONS,
} from '../../../domain/entities/Assessment';
import type {
  AssessmentDraft,
  Severity,
  SkinArea,
  SkinSymptom,
  SymptomDuration,
} from '../../../domain/entities/Assessment';
import { QUESTION_ORDER } from '../../../domain/rules/assessmentRules';
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

export function QuestionStep(props: QuestionStepProps) {
  const theme = useTheme();
  const question = QUESTION_ORDER[props.questionIndex] ?? 'area';
  const total = QUESTION_ORDER.length;
  const last = props.questionIndex === total - 1;
  const progressText = translate('assessment.questions.progress', {
    current: props.questionIndex + 1,
    total,
  });

  return (
    <>
      <View style={{ gap: theme.spacing[2] }}>
        <Typography
          variant="caption"
          tone="secondary"
          accessibilityLiveRegion="polite"
        >
          {progressText}
        </Typography>
        <ProgressBar
          value={(props.questionIndex + 1) / total}
          accessibilityLabel={progressText}
        />
      </View>

      <Typography variant="title" accessibilityRole="header">
        {translate(`assessment.questions.${question}.title`)}
      </Typography>

      {question === 'area' ? (
        <View
          style={[styles.grid, { gap: theme.spacing[2] }]}
          accessibilityRole="radiogroup"
        >
          {SKIN_AREAS.map(area => (
            <View key={area} style={styles.half}>
              <SelectableCard
                role="radio"
                label={translate(`assessment.questions.area.options.${area}`)}
                selected={props.draft.area === area}
                onPress={() => props.onSelectArea(area)}
                testID={`area-${area}`}
              />
            </View>
          ))}
        </View>
      ) : null}

      {question === 'duration' ? (
        <View style={{ gap: theme.spacing[2] }} accessibilityRole="radiogroup">
          {SYMPTOM_DURATIONS.map(duration => (
            <SelectableCard
              key={duration}
              role="radio"
              label={translate(
                `assessment.questions.duration.options.${duration}`,
              )}
              selected={props.draft.duration === duration}
              onPress={() => props.onSelectDuration(duration)}
              testID={`duration-${duration}`}
            />
          ))}
        </View>
      ) : null}

      {question === 'symptoms' ? (
        <>
          <Typography variant="caption" tone="secondary">
            {translate('assessment.questions.symptoms.hint')}
          </Typography>
          <View style={[styles.grid, { gap: theme.spacing[2] }]}>
            {SKIN_SYMPTOMS.map(symptom => (
              <View key={symptom} style={styles.half}>
                <SelectableCard
                  role="checkbox"
                  label={translate(
                    `assessment.questions.symptoms.options.${symptom}`,
                  )}
                  selected={props.draft.symptoms.includes(symptom)}
                  onPress={() => props.onToggleSymptom(symptom)}
                  testID={`symptom-${symptom}`}
                />
              </View>
            ))}
          </View>
        </>
      ) : null}

      {question === 'severity' ? (
        <View style={{ gap: theme.spacing[2] }} accessibilityRole="radiogroup">
          {SEVERITIES.map(severity => (
            <SelectableCard
              key={severity}
              role="radio"
              label={translate(
                `assessment.questions.severity.options.${severity}.label`,
              )}
              description={translate(
                `assessment.questions.severity.options.${severity}.description`,
              )}
              selected={props.draft.severity === severity}
              onPress={() => props.onSelectSeverity(severity)}
              testID={`severity-${severity}`}
            />
          ))}
        </View>
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

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  half: { flexGrow: 1, flexBasis: '45%' },
});
