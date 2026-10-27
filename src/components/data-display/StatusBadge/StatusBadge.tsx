import { StyleSheet, Text, View } from 'react-native';
import { Icon } from '../../primitives';
import { useTheme } from '../../../styles/theme';
import type { StatusBadgeProps } from './StatusBadge.types';

export function StatusBadge({
  label,
  tone = 'neutral',
  icon,
  testID,
}: StatusBadgeProps) {
  const theme = useTheme();
  const palette = theme.colors.feedback[tone];
  return (
    <View
      accessible
      accessibilityLabel={label}
      style={[
        styles.badge,
        {
          gap: theme.spacing[1],
          paddingHorizontal: theme.spacing[2],
          paddingVertical: theme.spacing[1],
          borderRadius: theme.radius.pill,
          backgroundColor: palette.background,
        },
      ]}
      testID={testID}
    >
      {icon ? <Icon name={icon} size={14} color={palette.foreground} /> : null}
      <Text
        style={[
          theme.typography.caption,
          styles.text,
          { color: palette.foreground },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  text: { fontWeight: '600' },
});
