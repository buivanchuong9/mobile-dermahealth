import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '@styles/theme';
import { AppServicesProvider } from '../../contexts/AppServicesProvider';
import { AppSessionProvider } from '../../contexts/AppSessionProvider';
import { RootNavigator } from '../navigation/RootNavigator';

export function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <StatusBar barStyle="dark-content" />
        <AppServicesProvider>
          <AppSessionProvider>
            <RootNavigator />
          </AppSessionProvider>
        </AppServicesProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
