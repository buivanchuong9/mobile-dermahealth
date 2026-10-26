import { StyleSheet, Text, View } from 'react-native';
import { FadeInView } from '@design-system/motion';
import { Button, Typography } from '@design-system/primitives';
import { ScreenContainer } from '@design-system/surfaces';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import type { WelcomeScreenProps } from './WelcomeScreen.types';

export function WelcomeScreen({ onSignIn, onRegister }: WelcomeScreenProps) {
  const theme = useTheme();
  return (
    <ScreenContainer
      background="primary"
      footer={
        <View style={{ gap: theme.spacing[2] }}>
          <Button
            label={translate('auth.welcome.signIn')}
            onPress={onSignIn}
            fullWidth
            size="lg"
            testID="welcome-sign-in"
          />
          <Button
            label={translate('auth.welcome.register')}
            variant="secondary"
            onPress={onRegister}
            fullWidth
            size="lg"
            testID="welcome-register"
          />
        </View>
      }
    >
      <FadeInView>
        <View
          style={[
            styles.hero,
            { gap: theme.spacing[4], paddingTop: theme.spacing[10] },
          ]}
        >
          <View
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={[
              styles.mark,
              {
                borderRadius: theme.radius.xl,
                backgroundColor: theme.colors.brand.primary,
              },
            ]}
          >
            <Text
              style={[
                theme.typography.display,
                { color: theme.colors.text.onBrand },
              ]}
            >
              D
            </Text>
          </View>
          <Typography
            variant="display"
            align="center"
            accessibilityRole="header"
          >
            {translate('auth.welcome.title')}
          </Typography>
          <Typography tone="secondary" align="center">
            {translate('auth.welcome.subtitle')}
          </Typography>
          <Typography variant="caption" tone="secondary" align="center">
            {translate('auth.welcome.simulatedNote')}
          </Typography>
        </View>
      </FadeInView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center' },
  mark: {
    width: 88,
    height: 88,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
