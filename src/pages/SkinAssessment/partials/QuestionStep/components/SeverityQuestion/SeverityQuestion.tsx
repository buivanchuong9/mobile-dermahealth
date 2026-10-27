import { View } from 'react-native';
import { SelectableCard } from '@components/inputs';
import { useTheme } from '@styles/theme';
import { translate } from '@i18n';
import { SEVERITIES } from '../../../../../../model/skinAssessment/Assessment';
import type { SeverityQuestionProps } from './SeverityQuestion.types';

export function SeverityQuestion({ value, onSelect }: SeverityQuestionProps) {
  const theme = useTheme();
  return (
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
          selected={value === severity}
          onPress={() => onSelect(severity)}
          testID={`severity-${severity}`}
        />
      ))}
    </View>
  );
}
