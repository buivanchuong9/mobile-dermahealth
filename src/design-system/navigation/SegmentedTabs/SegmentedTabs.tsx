import { Pressable, StyleSheet, View } from 'react-native';
import { MIN_TOUCH_TARGET } from '../../accessibility';
import { Typography } from '../../primitives';
import { useTheme } from '../../theme';

export type SegmentedTabItem = {
  readonly key: string;
  readonly label: string;
  readonly count?: number;
};

export type SegmentedTabsProps = {
  readonly items: readonly SegmentedTabItem[];
  readonly selectedKey: string;
  readonly onSelect: (key: string) => void;
};

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
        const tabBackground = selected
          ? theme.colors.surface.primary
          : 'transparent';
        const text =
          item.count === undefined
            ? item.label
            : `${item.label} (${item.count})`;
        return (
          <Pressable
            key={item.key}
            accessibilityRole="tab"
            accessibilityLabel={text}
            accessibilityState={{ selected }}
            onPress={() => onSelect(item.key)}
            style={[
              styles.tab,
              {
                borderRadius: theme.radius.md,
                backgroundColor: tabBackground,
              },
            ]}
            testID={`tab-${item.key}`}
          >
            <Typography
              variant="bodyStrong"
              tone={selected ? 'brand' : 'secondary'}
              align="center"
              numberOfLines={1}
            >
              {text}
            </Typography>
          </Pressable>
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
