import { StyleSheet, View } from 'react-native';
import { Icon, Typography } from '@components/primitives';
import { SectionCard } from '@components/surfaces';
import { useTheme } from '@styles/theme';
import type { DetailSectionProps } from './DetailSection.types';

/** A card listing bullet-style items; renders nothing when empty. */
export function DetailSection({ title, items }: DetailSectionProps) {
  const theme = useTheme();
  if (items.length === 0) {
    return null;
  }
  return (
    <SectionCard title={title}>
      <View style={{ gap: theme.spacing[2] }}>
        {items.map(item => (
          <View
            key={item.primary}
            style={[styles.row, { gap: theme.spacing[2] }]}
          >
            <Icon name="check" size={16} color={theme.colors.brand.primary} />
            <View style={styles.text}>
              <Typography variant="bodyStrong">{item.primary}</Typography>
              {item.secondary ? (
                <Typography variant="caption" tone="secondary">
                  {item.secondary}
                </Typography>
              ) : null}
            </View>
          </View>
        ))}
      </View>
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start' },
  text: { flex: 1 },
});
