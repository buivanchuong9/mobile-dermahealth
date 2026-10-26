import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '@design-system/theme';
import { AppServicesProvider } from '../providers/AppServicesProvider';
import { AppSessionProvider } from '../providers/AppSessionProvider';
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
