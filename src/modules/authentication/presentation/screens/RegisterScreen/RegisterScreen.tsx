import { useRef } from 'react';
import { View } from 'react-native';
import { Banner } from '@design-system/feedback';
import { SelectableCard, TextField } from '@design-system/inputs';
import type { TextFieldHandle } from '@design-system/inputs';
import { Button, Typography } from '@design-system/primitives';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import type { AuthSession } from '../../../domain/entities/AuthSession';
import type { AuthService } from '../../../domain/services/AuthService';
import { AuthScreenLayout } from '../../components/AuthScreenLayout';
import { getIssueMessage } from '../../issueMessage';
import { useRegisterForm } from '../../hooks/useRegisterForm';

export type RegisterScreenProps = {
  readonly authService: AuthService;
  readonly onRegistered: (session: AuthSession) => void;
  readonly onBack: () => void;
  readonly onSignIn: () => void;
};

export function RegisterScreen({
  authService,
  onRegistered,
  onBack,
  onSignIn,
}: RegisterScreenProps) {
  const theme = useTheme();
  const form = useRegisterForm(authService, onRegistered);
  const emailRef = useRef<TextFieldHandle>(null);
  const phoneRef = useRef<TextFieldHandle>(null);
  const passwordRef = useRef<TextFieldHandle>(null);
  const confirmRef = useRef<TextFieldHandle>(null);
  const failureKey =
    form.failure === 'validation' || form.failure === 'unavailable'
      ? form.failure
      : 'unknown';
  const busy = form.submitting;

  return (
    <AuthScreenLayout
      title={translate('auth.register.title')}
      subtitle={translate('auth.register.subtitle')}
      onBack={onBack}
    >
      <View style={{ gap: theme.spacing[3] }}>
        <TextField
          label={translate('auth.fields.fullName')}
          placeholder={translate('auth.fields.fullNamePlaceholder')}
          value={form.values.fullName}
          onChangeText={value => form.change('fullName', value)}
          errorMessage={getIssueMessage(form.issues.fullName)}
          leftIcon="user"
          autoCapitalize="words"
          autoComplete="name"
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current?.focus()}
          editable={!busy}
          testID="register-name"
        />
        <TextField
          label={translate('auth.fields.email')}
          placeholder={translate('auth.fields.emailPlaceholder')}
          value={form.values.email}
          onChangeText={value => form.change('email', value)}
          errorMessage={getIssueMessage(form.issues.email)}
          leftIcon="mail"
          keyboardType="email-address"
          autoComplete="email"
          returnKeyType="next"
          onSubmitEditing={() => phoneRef.current?.focus()}
          editable={!busy}
          inputRef={emailRef}
          testID="register-email"
        />
        <TextField
          label={translate('auth.fields.phone')}
          placeholder={translate('auth.fields.phonePlaceholder')}
          helperText={translate('auth.hints.phone')}
          value={form.values.phone}
          onChangeText={value => form.change('phone', value)}
          errorMessage={getIssueMessage(form.issues.phone)}
          leftIcon="phone"
          keyboardType="phone-pad"
          autoComplete="tel"
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
          editable={!busy}
          inputRef={phoneRef}
          testID="register-phone"
        />
        <TextField
          label={translate('auth.fields.newPassword')}
          helperText={translate('auth.hints.password')}
          value={form.values.password}
          onChangeText={value => form.change('password', value)}
          errorMessage={getIssueMessage(form.issues.password)}
          leftIcon="lock"
          secureTextEntry
          autoComplete="new-password"
          returnKeyType="next"
          onSubmitEditing={() => confirmRef.current?.focus()}
          editable={!busy}
          inputRef={passwordRef}
          testID="register-password"
        />
        <TextField
          label={translate('auth.fields.confirmPassword')}
          value={form.values.confirmPassword}
          onChangeText={value => form.change('confirmPassword', value)}
          errorMessage={getIssueMessage(form.issues.confirmPassword)}
          leftIcon="lock"
          secureTextEntry
          autoComplete="new-password"
          returnKeyType="done"
          onSubmitEditing={form.submit}
          editable={!busy}
          inputRef={confirmRef}
          testID="register-confirm"
        />
      </View>
      <View style={{ gap: theme.spacing[1] }}>
        <SelectableCard
          role="checkbox"
          label={translate('auth.register.terms')}
          selected={form.values.acceptedTerms}
          disabled={busy}
          onPress={() =>
            form.change('acceptedTerms', !form.values.acceptedTerms)
          }
          testID="register-terms"
        />
        {form.issues.terms ? (
          <Typography variant="caption" tone="error" accessibilityRole="alert">
            {translate('auth.issues.terms_required')}
          </Typography>
        ) : null}
      </View>
      {form.failure ? (
        <Banner
          tone="danger"
          message={translate(`auth.register.failed.${failureKey}`)}
          testID="register-failure"
        />
      ) : null}
      <Button
        label={translate('auth.register.submit')}
        onPress={form.submit}
        loading={busy}
        fullWidth
        size="lg"
        testID="register-submit"
      />
      <Button
        label={`${translate('auth.register.haveAccount')} ${translate(
          'auth.register.signIn',
        )}`}
        variant="ghost"
        onPress={onSignIn}
        disabled={busy}
        fullWidth
        testID="register-sign-in"
      />
    </AuthScreenLayout>
  );
}
