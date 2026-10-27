import { StyleSheet, View } from 'react-native';
import { Banner, SuccessMark } from '@components/feedback';
import { TextField } from '@components/inputs';
import { Button, Typography } from '@components/primitives';
import { useTheme } from '@styles/theme';
import { translate } from '@i18n';
import { AuthScreenLayout } from '../partials/AuthScreenLayout';
import { useForgotPasswordForm } from '../hooks/useForgotPasswordForm';
import type { ForgotPasswordScreenProps } from './ForgotPasswordScreen.types';

export function ForgotPasswordScreen({
  authService,
  onBack,
}: ForgotPasswordScreenProps) {
  const theme = useTheme();
  const form = useForgotPasswordForm(authService);

  if (form.sentTo !== null) {
    return (
      <AuthScreenLayout title={translate('auth.forgot.title')} onBack={onBack}>
        <View style={[styles.center, { gap: theme.spacing[3] }]}>
          <SuccessMark />
          <Typography
            variant="subtitle"
            align="center"
            accessibilityRole="header"
          >
            {translate('auth.forgot.successTitle')}
          </Typography>
          <Typography tone="secondary" align="center" testID="forgot-success">
            {translate('auth.forgot.successBody', { email: form.sentTo })}
          </Typography>
        </View>
        <Button
          label={translate('auth.forgot.backToSignIn')}
          onPress={onBack}
          fullWidth
          size="lg"
          testID="forgot-back"
        />
      </AuthScreenLayout>
    );
  }

  return (
    <AuthScreenLayout
      title={translate('auth.forgot.title')}
      subtitle={translate('auth.forgot.subtitle')}
      onBack={onBack}
    >
      <TextField
        label={translate('auth.fields.email')}
        placeholder={translate('auth.fields.emailPlaceholder')}
        value={form.email}
        onChangeText={form.changeEmail}
        errorMessage={
          form.issue ? translate(`auth.issues.${form.issue}`) : undefined
        }
        leftIcon="mail"
        keyboardType="email-address"
        autoComplete="email"
        returnKeyType="done"
        onSubmitEditing={form.submit}
        editable={!form.submitting}
        testID="forgot-email"
      />
      {form.failed ? (
        <Banner tone="danger" message={translate('auth.forgot.failed')} />
      ) : null}
      <Button
        label={translate('auth.forgot.submit')}
        onPress={form.submit}
        loading={form.submitting}
        fullWidth
        size="lg"
        testID="forgot-submit"
      />
    </AuthScreenLayout>
  );
}

const styles = StyleSheet.create({ center: { alignItems: 'center' } });
