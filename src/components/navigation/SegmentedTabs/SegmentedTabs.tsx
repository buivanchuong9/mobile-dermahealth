import { StyleSheet, View } from 'react-native';
import { MIN_TOUCH_TARGET } from '../../../utils/accessibility';
import { SelectionFill } from '../../motion';
import { PressableScale, Typography } from '../../primitives';
import { useTheme } from '../../../styles/theme';
import type { SegmentedTabsProps } from './SegmentedTabs.types';

export function SegmentedTabs({
  items,
  selectedKey,
  onSelect,
}: SegmentedTabsProps) {
  const theme = useTheme();
  return (
    <View
      accessibilityRole="tablist"
      style={[
        styles.track,
        {
          padding: theme.spacing[1],
          borderRadius: theme.radius.lg,
          backgroundColor: theme.colors.feedback.info.background,
        },
      ]}
    >
      {items.map(item => {
        const selected = item.key === selectedKey;
        const text =
          item.count === undefined
            ? item.label
            : `${item.label} (${item.count})`;
        return (
          <PressableScale
            key={item.key}
            accessibilityRole="tab"
            accessibilityLabel={text}
            accessibilityState={{ selected }}
            onPress={() => onSelect(item.key)}
            style={[styles.tab, { borderRadius: theme.radius.md }]}
            testID={`tab-${item.key}`}
          >
            <SelectionFill
              selected={selected}
              unselectedBackground={theme.colors.feedback.info.background}
              selectedBackground={theme.colors.surface.primary}
              borderRadius={theme.radius.md}
            />
            <Typography
              variant="bodyStrong"
              tone={selected ? 'brand' : 'secondary'}
              align="center"
              numberOfLines={1}
            >
              {text}
            </Typography>
          </PressableScale>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: { flexDirection: 'row' },
  tab: {
    flex: 1,
    minHeight: MIN_TOUCH_TARGET - 4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
});
