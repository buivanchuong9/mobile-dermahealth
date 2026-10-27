import { StyleSheet, View } from 'react-native';
import { SelectableCard } from '@components/inputs';
import { useTheme } from '@styles/theme';
import { translate } from '@i18n';
import { SPECIALTY_IDS } from '../../../../model/appointments/Appointment';
import type { SpecialtySelectorProps } from './SpecialtySelector.types';

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
