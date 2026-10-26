import { Banner } from '@design-system/feedback';
import { Button } from '@design-system/primitives';
import { translate } from '@shared/localization';
import { AuthScreenLayout } from '../../components/AuthScreenLayout';
import { useRegisterForm } from '../../hooks/useRegisterForm';
import { RegistrationFields } from './components/RegistrationFields';
import { TermsConsent } from './components/TermsConsent';
import type { RegisterScreenProps } from './RegisterScreen.types';

export function RegisterScreen({
  authService,
  onRegistered,
  onBack,
  onSignIn,
}: RegisterScreenProps) {
  const form = useRegisterForm(authService, onRegistered);
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
      <RegistrationFields
        values={form.values}
        issues={form.issues}
        disabled={busy}
        onChange={form.change}
        onSubmit={form.submit}
      />
      <TermsConsent
        accepted={form.values.acceptedTerms}
        showError={form.issues.terms !== undefined}
        disabled={busy}
        onToggle={() =>
          form.change('acceptedTerms', !form.values.acceptedTerms)
        }
      />
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
