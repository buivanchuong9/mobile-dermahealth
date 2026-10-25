import { Pressable, StyleSheet, View } from 'react-native';
import { MIN_TOUCH_TARGET } from '../../accessibility';
import { Typography } from '../../primitives';
import { useTheme } from '../../theme';
import { SelectionIndicator } from './SelectionIndicator';
import type { SelectableCardProps } from './SelectableCard.types';

export function SelectableCard({
  label,
  description,
  selected,
  onPress,
  role,
  disabled = false,
  testID,
}: SelectableCardProps) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole={role}
      accessibilityLabel={description ? `${label}. ${description}` : label}
      accessibilityState={{ checked: selected, disabled }}
      disabled={disabled}
      onPress={onPress}
      testID={testID}
      style={({ pressed }) => [
        styles.card,
        {
          padding: theme.spacing[4],
          gap: theme.spacing[3],
          borderRadius: theme.radius.md,
          borderColor: selected
            ? theme.colors.brand.primary
            : theme.colors.border.default,
          backgroundColor: selected
            ? theme.colors.background.secondary
            : theme.colors.surface.primary,
          opacity: pressed || disabled ? 0.7 : 1,
        },
      ]}
    >
      <SelectionIndicator
        shape={role === 'radio' ? 'circle' : 'square'}
        selected={selected}
      />
      <View style={styles.text}>
        <Typography variant="bodyStrong">{label}</Typography>
        {description ? (
          <Typography variant="caption" tone="secondary">
            {description}
          </Typography>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    minHeight: MIN_TOUCH_TARGET + 12,
  },
  text: { flex: 1 },
});
