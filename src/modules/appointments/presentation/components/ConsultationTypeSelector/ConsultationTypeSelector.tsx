import { View } from 'react-native';
import { SelectableCard } from '@design-system/inputs';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import type { ConsultationType } from '../../../domain/entities/Appointment';

const TYPES: readonly ConsultationType[] = ['in_person', 'video'];

export type ConsultationTypeSelectorProps = {
  readonly value: ConsultationType;
  readonly onChange: (value: ConsultationType) => void;
  readonly disabled?: boolean;
};

export function ConsultationTypeSelector({
  value,
  onChange,
  disabled = false,
}: ConsultationTypeSelectorProps) {
  const theme = useTheme();
  return (
    <View
      accessibilityRole="radiogroup"
      accessibilityLabel={translate('appointments.booking.typeSection')}
      style={{ gap: theme.spacing[2] }}
    >
      {TYPES.map(type => (
        <SelectableCard
          key={type}
          role="radio"
          label={translate(`appointments.consultationType.${type}`)}
          description={translate(`appointments.consultationTypeHint.${type}`)}
          selected={value === type}
          disabled={disabled}
          onPress={() => onChange(type)}
          testID={`consultation-type-${type}`}
        />
      ))}
    </View>
  );
}
