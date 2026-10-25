import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { MIN_TOUCH_TARGET } from '@design-system/accessibility';
import { Typography } from '@design-system/primitives';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import type { RecordFilter } from '../../../domain/entities/RecordEntry';

const FILTERS: readonly RecordFilter[] = [
  'all',
  'clinician_confirmed',
  'patient_reported',
  'ai_generated',
];

export type RecordFilterChipsProps = {
  readonly value: RecordFilter;
  readonly onChange: (filter: RecordFilter) => void;
};

export function RecordFilterChips({ value, onChange }: RecordFilterChipsProps) {
  const theme = useTheme();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      accessibilityRole="radiogroup"
      contentContainerStyle={{ gap: theme.spacing[2] }}
    >
      {FILTERS.map(filter => {
        const selected = filter === value;
        const background = selected
          ? theme.colors.brand.primary
          : theme.colors.surface.primary;
        const border = selected
          ? theme.colors.brand.primary
          : theme.colors.border.default;
        return (
          <Pressable
            key={filter}
            accessibilityRole="radio"
            accessibilityLabel={translate(`records.filters.${filter}`)}
            accessibilityState={{ checked: selected }}
            onPress={() => onChange(filter)}
            style={[
              styles.chip,
              {
                borderRadius: theme.radius.pill,
                backgroundColor: background,
                borderColor: border,
                paddingHorizontal: theme.spacing[4],
              },
            ]}
            testID={`filter-${filter}`}
          >
            <Typography
              variant="bodyStrong"
              tone={selected ? 'onBrand' : 'primary'}
            >
              {translate(`records.filters.${filter}`)}
            </Typography>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  chip: {
    minHeight: MIN_TOUCH_TARGET,
    justifyContent: 'center',
    borderWidth: 1.5,
  },
});
