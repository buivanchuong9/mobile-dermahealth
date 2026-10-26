import { SelectableCard } from '@design-system/inputs';
import { Typography } from '@design-system/primitives';
import { translate } from '@shared/localization';
import { SKIN_SYMPTOMS } from '../../../../../domain/entities/Assessment';
import { OptionGrid } from '../OptionGrid';
import type { SymptomsQuestionProps } from './SymptomsQuestion.types';

export function SymptomsQuestion({
  selected,
  onToggle,
}: SymptomsQuestionProps) {
  return (
    <>
      <Typography variant="caption" tone="secondary">
        {translate('assessment.questions.symptoms.hint')}
      </Typography>
      <OptionGrid>
        {SKIN_SYMPTOMS.map(symptom => (
          <SelectableCard
            key={symptom}
            role="checkbox"
            label={translate(
              `assessment.questions.symptoms.options.${symptom}`,
            )}
            selected={selected.includes(symptom)}
            onPress={() => onToggle(symptom)}
            testID={`symptom-${symptom}`}
          />
        ))}
      </OptionGrid>
    </>
  );
}
