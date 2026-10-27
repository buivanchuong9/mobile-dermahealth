import { View } from 'react-native';
import { SelectableCard } from '@components/inputs';
import { useTheme } from '@styles/theme';
import { translate } from '@i18n';
import { SYMPTOM_DURATIONS } from '../../../../../../model/skinAssessment/Assessment';
import type { DurationQuestionProps } from './DurationQuestion.types';

export function DurationQuestion({ value, onSelect }: DurationQuestionProps) {
  const theme = useTheme();
  return (
    <View style={{ gap: theme.spacing[2] }} accessibilityRole="radiogroup">
      {SYMPTOM_DURATIONS.map(duration => (
        <SelectableCard
          key={duration}
          role="radio"
          label={translate(`assessment.questions.duration.options.${duration}`)}
          selected={value === duration}
          onPress={() => onSelect(duration)}
          testID={`duration-${duration}`}
        />
      ))}
    </View>
  );
}
