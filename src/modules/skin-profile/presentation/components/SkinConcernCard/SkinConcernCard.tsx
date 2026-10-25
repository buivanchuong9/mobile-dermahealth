import { SelectableCard } from '@design-system/inputs';
import { translate } from '@shared/localization';
import type { SkinConcern } from '../../../domain/value-objects/SkinConcern';

export type SkinConcernCardProps = {
  readonly concern: SkinConcern;
  readonly selected: boolean;
  readonly onToggle: (concern: SkinConcern) => void;
  readonly disabled?: boolean;
};

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
