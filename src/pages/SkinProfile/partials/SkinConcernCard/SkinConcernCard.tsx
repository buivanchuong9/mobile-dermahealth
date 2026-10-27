import { SelectableCard } from '@components/inputs';
import { translate } from '@i18n';
import type { SkinConcernCardProps } from './SkinConcernCard.types';

export function SkinConcernCard({
  concern,
  selected,
  onToggle,
  disabled = false,
}: SkinConcernCardProps) {
  return (
    <SelectableCard
      role="checkbox"
      label={translate(`skinProfile.concerns.options.${concern}`)}
      selected={selected}
      disabled={disabled}
      onPress={() => onToggle(concern)}
      testID={`skin-concern-${concern}`}
    />
  );
}
