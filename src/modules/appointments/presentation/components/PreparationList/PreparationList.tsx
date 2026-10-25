import { StyleSheet, View } from 'react-native';
import { Icon, Typography } from '@design-system/primitives';
import { useTheme } from '@design-system/theme';

export function PreparationList({
  items,
}: {
  readonly items: readonly string[];
}) {
  const theme = useTheme();
  return (
    <View style={{ gap: theme.spacing[2] }}>
      {items.map(item => (
        <View key={item} style={[styles.row, { gap: theme.spacing[2] }]}>
          <Icon
            name="check"
            size={16}
            color={theme.colors.feedback.success.foreground}
          />
          <View style={styles.text}>
            <Typography variant="caption">{item}</Typography>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start' },
  text: { flex: 1 },
});
