import { Pressable, StyleSheet, Switch, View } from 'react-native';
import { MIN_TOUCH_TARGET } from '../../accessibility';
import { Typography } from '../../primitives';
import { useTheme } from '../../theme';
import type { SwitchRowProps } from './SwitchRow.types';

export function SwitchRow({
  label,
  description,
  value,
  onValueChange,
  disabled = false,
  testID,
}: SwitchRowProps) {
  const theme = useTheme();
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityLabel={description ? `${label}. ${description}` : label}
      accessibilityState={{ checked: value, disabled }}
      disabled={disabled}
      onPress={() => onValueChange(!value)}
      style={[
        styles.row,
        { gap: theme.spacing[3], paddingVertical: theme.spacing[2] },
      ]}
      testID={testID}
    >
      <View style={styles.text}>
        <Typography variant="bodyStrong">{label}</Typography>
        {description ? (
          <Typography variant="caption" tone="secondary">
            {description}
          </Typography>
        ) : null}
      </View>
      <Switch
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{
          false: theme.colors.border.default,
          true: theme.colors.brand.primary,
        }}
        thumbColor={theme.colors.surface.primary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: MIN_TOUCH_TARGET,
  },
  text: { flex: 1 },
});
