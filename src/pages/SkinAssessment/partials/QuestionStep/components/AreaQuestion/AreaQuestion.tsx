import { SelectableCard } from '@components/inputs';
import { translate } from '@i18n';
import { SKIN_AREAS } from '../../../../../../model/skinAssessment/Assessment';
import { OptionGrid } from '../OptionGrid';
import type { AreaQuestionProps } from './AreaQuestion.types';

export function AreaQuestion({ value, onSelect }: AreaQuestionProps) {
  return (
    <OptionGrid>
      {SKIN_AREAS.map(area => (
        <SelectableCard
          key={area}
          role="radio"
          label={translate(`assessment.questions.area.options.${area}`)}
          selected={value === area}
          onPress={() => onSelect(area)}
          testID={`area-${area}`}
        />
      ))}
    </OptionGrid>
  );
}
