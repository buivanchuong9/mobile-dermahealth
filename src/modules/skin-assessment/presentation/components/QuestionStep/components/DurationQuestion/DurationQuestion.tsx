import { View } from 'react-native';
import { SelectableCard } from '@design-system/inputs';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import { SYMPTOM_DURATIONS } from '../../../../../domain/entities/Assessment';
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
