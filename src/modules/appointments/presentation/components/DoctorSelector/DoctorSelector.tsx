import { View } from 'react-native';
import { SelectableCard } from '@design-system/inputs';
import { useTheme } from '@design-system/theme';
import type { Doctor } from '../../../domain/entities/Appointment';

export type DoctorSelectorProps = {
  readonly doctors: readonly Doctor[];
  readonly value: string | null;
  readonly onChange: (doctorId: string) => void;
  readonly label: string;
  readonly disabled?: boolean;
};

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
