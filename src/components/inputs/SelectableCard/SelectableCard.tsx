import { StyleSheet, View } from 'react-native';
import { MIN_TOUCH_TARGET } from '../../../utils/accessibility';
import { SelectionFill } from '../../motion';
import { PressableScale, Typography } from '../../primitives';
import { useTheme } from '../../../styles/theme';
import { SelectionIndicator } from './components/SelectionIndicator';
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
  const cardOpacity = disabled ? 0.7 : 1;

  return (
    <PressableScale
      accessibilityRole={role}
      accessibilityLabel={description ? `${label}. ${description}` : label}
      accessibilityState={{ checked: selected, disabled }}
      disabled={disabled}
      onPress={onPress}
      testID={testID}
      style={[
        styles.card,
        {
          padding: theme.spacing[4],
          gap: theme.spacing[3],
          borderRadius: theme.radius.md,
          opacity: cardOpacity,
        },
      ]}
    >
      <SelectionFill
        selected={selected}
        unselectedBackground={theme.colors.surface.primary}
        selectedBackground={theme.colors.background.secondary}
        unselectedBorder={theme.colors.border.default}
        selectedBorder={theme.colors.brand.primary}
        borderWidth={2}
        borderRadius={theme.radius.md}
      />
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
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: MIN_TOUCH_TARGET + 12,
  },
  text: { flex: 1 },
});
