import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SkinProfileScreen } from '@pages/SkinProfile';
import { useTheme } from '@styles/theme';
import { useAppServices } from '../../../../contexts/AppServicesProvider';
import { BackBar } from '../../BackBar';
import { useRootNavigation } from '../../hooks/useRootNavigation';

const styles = StyleSheet.create({ fill: { flex: 1 } });

export function SkinProfileRoute() {
  const navigation = useRootNavigation();
  const services = useAppServices();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.fill,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          backgroundColor: theme.colors.background.primary,
        },
      ]}
    >
      <BackBar onPress={navigation.goBack} />
      <SkinProfileScreen useCases={services.skinProfile} />
    </View>
  );
}
