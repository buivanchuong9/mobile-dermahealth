import { View } from 'react-native';
import { SelectableCard } from '@design-system/inputs';
import { useTheme } from '@design-system/theme';
import type { DoctorSelectorProps } from './DoctorSelector.types';

export function DoctorSelector({
  doctors,
  value,
  onChange,
  label,
  disabled = false,
}: DoctorSelectorProps) {
  const theme = useTheme();
  return (
    <View
      accessibilityRole="radiogroup"
      accessibilityLabel={label}
      style={{ gap: theme.spacing[2] }}
    >
      {doctors.map(doctor => (
        <SelectableCard
          key={doctor.id}
          role="radio"
          label={doctor.name}
          description={doctor.title}
          selected={value === doctor.id}
          disabled={disabled}
          onPress={() => onChange(doctor.id)}
          testID={`doctor-${doctor.id}`}
        />
      ))}
    </View>
  );
}
