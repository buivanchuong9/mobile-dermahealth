import { StyleSheet, View } from 'react-native';
import { SelectableCard } from '@design-system/inputs';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import { SPECIALTY_IDS } from '../../../domain/entities/Appointment';
import type { SpecialtyId } from '../../../domain/entities/Appointment';

export type SpecialtySelectorProps = {
  readonly value: SpecialtyId;
  readonly onChange: (value: SpecialtyId) => void;
  readonly disabled?: boolean;
};

export function SpecialtySelector({
  value,
  onChange,
  disabled = false,
}: SpecialtySelectorProps) {
  const theme = useTheme();
  return (
    <View
      accessibilityRole="radiogroup"
      accessibilityLabel={translate('appointments.booking.specialtySection')}
      style={[styles.grid, { gap: theme.spacing[2] }]}
    >
      {SPECIALTY_IDS.map(id => (
        <View key={id} style={styles.item}>
          <SelectableCard
            role="radio"
            label={translate(`appointments.specialty.${id}`)}
            selected={value === id}
            disabled={disabled}
            onPress={() => onChange(id)}
            testID={`specialty-${id}`}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  item: { flexGrow: 1, flexBasis: '45%' },
});
