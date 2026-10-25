import { StyleSheet, Text, View } from 'react-native';
import { Typography } from '@design-system/primitives';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';

const MARK_SIZE = 44;

export function HomeHeader() {
  const theme = useTheme();
  return (
    <View style={[styles.row, { gap: theme.spacing[3] }]}>
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={[
          styles.mark,
          {
            borderRadius: theme.radius.md,
            backgroundColor: theme.colors.brand.primary,
          },
        ]}
      >
        <Text
          style={[
            theme.typography.subtitle,
            { color: theme.colors.text.onBrand },
          ]}
        >
          D
        </Text>
      </View>
      <View style={styles.text}>
        <Typography variant="caption" tone="secondary">
          {translate('app.name')}
        </Typography>
        <Typography variant="title" accessibilityRole="header">
          {translate('home.title')}
        </Typography>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  mark: {
    width: MARK_SIZE,
    height: MARK_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { flex: 1 },
});
