import { View } from 'react-native';
import { SelectableCard } from '@components/inputs';
import { useTheme } from '@styles/theme';
import { translate } from '@i18n';
import type { ConsultationTypeSelectorProps } from './ConsultationTypeSelector.types';
import { TYPES } from './ConsultationTypeSelector.constants';

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
