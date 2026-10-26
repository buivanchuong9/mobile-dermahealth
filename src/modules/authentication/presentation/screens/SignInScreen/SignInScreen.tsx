import { useRef } from 'react';
import { View } from 'react-native';
import { Banner } from '@design-system/feedback';
import { TextField } from '@design-system/inputs';
import type { TextFieldHandle } from '@design-system/inputs';
import { Button } from '@design-system/primitives';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import { AuthScreenLayout } from '../../components/AuthScreenLayout';
import { getIssueMessage } from '../../issueMessage';
import { useSignInForm } from '../../hooks/useSignInForm';
import type { SignInScreenProps } from './SignInScreen.types';

export function SignInScreen({
  authService,
  onSignedIn,
  onBack,
  onForgotPassword,
  onRegister,
  demoAccountHint,
}: SignInScreenProps) {
  const theme = useTheme();
  const form = useSignInForm(authService, onSignedIn);
  const passwordRef = useRef<TextFieldHandle>(null);
  const failureKey =
    form.failure === 'permission_denied' || form.failure === 'unavailable'
      ? form.failure
      : 'unknown';

  return (
    <AuthScreenLayout
      title={translate('auth.signIn.title')}
      subtitle={translate('auth.signIn.subtitle')}
      onBack={onBack}
    >
      {demoAccountHint ? (
        <Banner
          tone="info"
          message={translate('auth.signIn.demoHint', demoAccountHint)}
        />
      ) : null}
      <View style={{ gap: theme.spacing[3] }}>
        <TextField
          label={translate('auth.fields.email')}
          placeholder={translate('auth.fields.emailPlaceholder')}
          value={form.email}
          onChangeText={form.changeEmail}
          errorMessage={getIssueMessage(form.issues.email)}
          leftIcon="mail"
          keyboardType="email-address"
          autoComplete="email"
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
          editable={!form.submitting}
          testID="sign-in-email"
        />
        <TextField
          label={translate('auth.fields.password')}
          placeholder={translate('auth.fields.passwordPlaceholder')}
          value={form.password}
          onChangeText={form.changePassword}
          errorMessage={getIssueMessage(form.issues.password)}
          leftIcon="lock"
          secureTextEntry
          autoComplete="current-password"
          returnKeyType="done"
          onSubmitEditing={form.submit}
          editable={!form.submitting}
          inputRef={passwordRef}
          testID="sign-in-password"
        />
      </View>
      {form.failure ? (
        <Banner
          tone="danger"
          message={translate(`auth.signIn.failed.${failureKey}`)}
          testID="sign-in-failure"
        />
      ) : null}
      <Button
        label={translate('auth.signIn.submit')}
        onPress={form.submit}
        loading={form.submitting}
        fullWidth
        size="lg"
        testID="sign-in-submit"
      />
      <Button
        label={translate('auth.signIn.forgot')}
        variant="ghost"
        onPress={onForgotPassword}
        disabled={form.submitting}
        fullWidth
        testID="sign-in-forgot"
      />
      <Button
        label={`${translate('auth.signIn.noAccount')} ${translate(
          'auth.signIn.createAccount',
        )}`}
        variant="ghost"
        onPress={onRegister}
        disabled={form.submitting}
        fullWidth
        testID="sign-in-register"
      />
    </AuthScreenLayout>
  );
}
