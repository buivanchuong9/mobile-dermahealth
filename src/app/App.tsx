import { useEffect, useState } from 'react';
import { BackHandler, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { HomeScreen } from '@modules/home';
import { SkinProfileScreen } from '@modules/skin-profile';
import { ThemeProvider, useTheme } from '@design-system/theme';
import { createSkinProfileUseCasesForApp } from './composition/createSkinProfileUseCasesForApp';
import { BackBar } from './navigation/BackBar';

type Route = 'home' | 'skinProfile';

function AppContent() {
  const theme = useTheme();
  const [useCases] = useState(createSkinProfileUseCasesForApp);
  const [route, setRoute] = useState<Route>('home');

  useEffect(() => {
    if (route === 'home') {
      return undefined;
    }
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        setRoute('home');
        return true;
      },
    );
    return () => subscription.remove();
  }, [route]);

  const background =
    route === 'home'
      ? theme.colors.background.secondary
      : theme.colors.background.primary;

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: background }]}>
      {route === 'home' ? (
        <HomeScreen
          skinProfileUseCases={useCases}
          onOpenSkinProfile={() => setRoute('skinProfile')}
        />
      ) : (
        <>
          <BackBar onPress={() => setRoute('home')} />
          <SkinProfileScreen useCases={useCases} />
        </>
      )}
    </SafeAreaView>
  );
}

export function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <StatusBar barStyle="dark-content" />
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({ root: { flex: 1 } });
