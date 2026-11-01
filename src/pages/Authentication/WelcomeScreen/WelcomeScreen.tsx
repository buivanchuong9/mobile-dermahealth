import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { FadeInView } from '@components/motion';
import { Button, Icon, Typography } from '@components/primitives';
import { ScreenContainer } from '@components/surfaces';
import { useTheme } from '@styles/theme';
import { translate } from '@i18n';
import { OnboardingArtwork } from '../../Onboarding/partials/OnboardingArtwork/OnboardingArtwork';
import type { WelcomeScreenProps } from './WelcomeScreen.types';

export function WelcomeScreen({ onSignIn, onRegister }: WelcomeScreenProps) {
  const theme = useTheme();
  const { height } = useWindowDimensions();
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
      <FadeInView variant="fade" style={styles.brand}>
        <View style={styles.brandMark}>
          <Icon name="heart" color="#FFFFFF" size={18} />
        </View>
        <Typography variant="bodyStrong">DermaHealth</Typography>
      </FadeInView>
      <FadeInView delay={80} variant="rise">
        <OnboardingArtwork
          id="assessment"
          height={Math.max(220, Math.min(300, height * 0.35))}
        />
      </FadeInView>
      <FadeInView delay={160} variant="rise" style={styles.copy}>
        <Typography variant="display" accessibilityRole="header">
          {translate('auth.welcome.title')}
        </Typography>
        <Typography tone="secondary">
          {translate('auth.welcome.subtitle')}
        </Typography>
      </FadeInView>
      <FadeInView delay={220} variant="fade" style={styles.note}>
        <Icon name="info" size={17} color="#53657E" />
        <View style={styles.noteText}>
          <Typography variant="caption" tone="secondary">
            {translate('auth.welcome.simulatedNote')}
          </Typography>
        </View>
      </FadeInView>
    </ScreenContainer>
  );
}
const styles = StyleSheet.create({
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    paddingVertical: 8,
  },
  brandMark: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
  },
  copy: { gap: 10 },
  note: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingBottom: 8,
  },
  noteText: { flex: 1 },
});
