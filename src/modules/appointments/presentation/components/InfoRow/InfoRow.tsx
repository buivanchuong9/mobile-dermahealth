import { StyleSheet, View } from 'react-native';
import { Icon, Typography } from '@design-system/primitives';
import { useTheme } from '@design-system/theme';
import type { InfoRowProps } from './InfoRow.types';

export function InfoRow({ icon, label, value, secondaryValue }: InfoRowProps) {
  const theme = useTheme();
  return (
    <View
      accessible
      accessibilityLabel={`${label}: ${value}${
        secondaryValue ? `, ${secondaryValue}` : ''
      }`}
      style={[styles.row, { gap: theme.spacing[3] }]}
    >
      <Icon name={icon} size={20} color={theme.colors.brand.primary} />
      <View style={styles.text}>
        <Typography variant="caption" tone="secondary">
          {label}
        </Typography>
        <Typography variant="bodyStrong">{value}</Typography>
        {secondaryValue ? (
          <Typography variant="caption" tone="secondary">
            {secondaryValue}
          </Typography>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start' },
  text: { flex: 1 },
});
