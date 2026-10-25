import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { MIN_TOUCH_TARGET } from '@design-system/accessibility';
import { Typography } from '@design-system/primitives';
import { useTheme } from '@design-system/theme';
import {
  formatDate,
  formatDayOfMonth,
  formatWeekdayLong,
  formatWeekdayShort,
} from '@shared/utilities/localDateTime';
import type { LocalDateKey } from '@shared/utilities/localDateTime';

export type DateStripProps = {
  readonly dateKeys: readonly LocalDateKey[];
  readonly selectedKey: LocalDateKey;
  readonly onSelect: (dateKey: LocalDateKey) => void;
  readonly disabled?: boolean;
};

export function DateStrip({
  dateKeys,
  selectedKey,
  onSelect,
  disabled = false,
}: DateStripProps) {
  const theme = useTheme();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: theme.spacing[2] }}
    >
      {dateKeys.map(dateKey => {
        const reference = `${dateKey}T00:00`;
        const selected = dateKey === selectedKey;
        const chipBackground = selected
          ? theme.colors.brand.primary
          : theme.colors.surface.primary;
        const chipBorder = selected
          ? theme.colors.brand.primary
          : theme.colors.border.default;
        return (
          <Pressable
            key={dateKey}
            accessibilityRole="radio"
            accessibilityLabel={`${formatWeekdayLong(reference)}, ${formatDate(
              reference,
            )}`}
            accessibilityState={{ checked: selected, disabled }}
            disabled={disabled}
            onPress={() => onSelect(dateKey)}
            style={[
              styles.chip,
              {
                borderRadius: theme.radius.md,
                backgroundColor: chipBackground,
                borderColor: chipBorder,
              },
            ]}
            testID={`date-${dateKey}`}
          >
            <Typography
              variant="caption"
              tone={selected ? 'onBrand' : 'secondary'}
            >
              {formatWeekdayShort(reference)}
            </Typography>
            <Typography
              variant="subtitle"
              tone={selected ? 'onBrand' : 'primary'}
            >
              {formatDayOfMonth(reference)}
            </Typography>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  chip: {
    minWidth: MIN_TOUCH_TARGET + 12,
    minHeight: MIN_TOUCH_TARGET + 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    paddingHorizontal: 8,
  },
});
