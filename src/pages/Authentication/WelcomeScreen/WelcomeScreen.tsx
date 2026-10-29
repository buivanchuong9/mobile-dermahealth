import { StyleSheet, View } from 'react-native';
import { FadeInView } from '@components/motion';
import { Button, Illustration, Typography } from '@components/primitives';
import { HeroPanel, ScreenContainer } from '@components/surfaces';
import { useTheme } from '@styles/theme';
import { translate } from '@i18n';
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
          <HeroPanel style={styles.heroPanel}>
            <Illustration name="welcome" width={250} />
          </HeroPanel>
          <Typography variant="display" accessibilityRole="header">
            {translate('auth.welcome.title')}
          </Typography>
          <Typography tone="secondary">
            {translate('auth.welcome.subtitle')}
          </Typography>
          <Typography variant="caption" tone="secondary">
            {translate('auth.welcome.simulatedNote')}
          </Typography>
        </View>
      </FadeInView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'stretch' },
  heroPanel: { alignSelf: 'stretch' },
});
