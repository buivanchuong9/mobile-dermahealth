import { ScrollView, StyleSheet } from 'react-native';
import { MIN_TOUCH_TARGET } from '@design-system/accessibility';
import { SelectionFill } from '@design-system/motion';
import { PressableScale, Typography } from '@design-system/primitives';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import type { RecordFilterChipsProps } from './RecordFilterChips.types';
import { FILTERS } from './RecordFilterChips.constants';

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
        return (
          <PressableScale
            key={filter}
            accessibilityRole="radio"
            accessibilityLabel={translate(`records.filters.${filter}`)}
            accessibilityState={{ checked: selected }}
            onPress={() => onChange(filter)}
            style={[
              styles.chip,
              {
                borderRadius: theme.radius.pill,
                paddingHorizontal: theme.spacing[4],
              },
            ]}
            testID={`filter-${filter}`}
          >
            <SelectionFill
              selected={selected}
              unselectedBackground={theme.colors.surface.primary}
              selectedBackground={theme.colors.brand.primary}
              unselectedBorder={theme.colors.border.default}
              selectedBorder={theme.colors.brand.primary}
              borderWidth={1.5}
              borderRadius={theme.radius.pill}
            />
            <Typography
              variant="bodyStrong"
              tone={selected ? 'onBrand' : 'primary'}
            >
              {translate(`records.filters.${filter}`)}
            </Typography>
          </PressableScale>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  chip: {
    minHeight: MIN_TOUCH_TARGET,
    justifyContent: 'center',
  },
});
