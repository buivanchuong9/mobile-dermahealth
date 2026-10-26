import { ScrollView, StyleSheet } from 'react-native';
import { MIN_TOUCH_TARGET } from '@design-system/accessibility';
import { SelectionFill } from '@design-system/motion';
import { PressableScale, Typography } from '@design-system/primitives';
import { useTheme } from '@design-system/theme';
import {
  formatDate,
  formatDayOfMonth,
  formatWeekdayLong,
  formatWeekdayShort,
} from '@shared/utilities/localDateTime';
import type { DateStripProps } from './DateStrip.types';

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
        return (
          <PressableScale
            key={dateKey}
            accessibilityRole="radio"
            accessibilityLabel={`${formatWeekdayLong(reference)}, ${formatDate(
              reference,
            )}`}
            accessibilityState={{ checked: selected, disabled }}
            disabled={disabled}
            onPress={() => onSelect(dateKey)}
            style={[styles.chip, { borderRadius: theme.radius.md }]}
            testID={`date-${dateKey}`}
          >
            <SelectionFill
              selected={selected}
              unselectedBackground={theme.colors.surface.primary}
              selectedBackground={theme.colors.brand.primary}
              unselectedBorder={theme.colors.border.default}
              selectedBorder={theme.colors.brand.primary}
              borderWidth={1.5}
              borderRadius={theme.radius.md}
            />
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
          </PressableScale>
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
    paddingHorizontal: 8,
  },
});
