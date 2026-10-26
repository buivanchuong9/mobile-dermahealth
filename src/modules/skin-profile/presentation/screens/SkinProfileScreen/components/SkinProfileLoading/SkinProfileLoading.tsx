import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';

export function SkinProfileLoading() {
  const theme = useTheme();
  return (
    <View
      accessibilityLabel={translate('skinProfile.loading')}
      accessibilityRole="progressbar"
      style={styles.centered}
      testID="skin-profile-loading"
    >
      <ActivityIndicator color={theme.colors.brand.primary} size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
