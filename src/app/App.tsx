import { useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { SkinProfileScreen } from '@modules/skin-profile';
import { ThemeProvider, useTheme } from '@design-system/theme';
import { createSkinProfileUseCasesForApp } from './composition/createSkinProfileUseCasesForApp';

function AppContent() {
  const theme = useTheme();
  const [useCases] = useState(createSkinProfileUseCasesForApp);

  return (
    <SafeAreaView
      style={[
        styles.root,
        { backgroundColor: theme.colors.background.primary },
      ]}
    >
      <SkinProfileScreen useCases={useCases} />
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
