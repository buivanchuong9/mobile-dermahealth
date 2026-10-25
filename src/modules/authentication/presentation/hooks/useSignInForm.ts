import { useCallback, useRef, useState } from 'react';
import type { AppErrorCode } from '@core/contracts';
import type { AuthSession } from '../../domain/entities/AuthSession';
import { validateSignIn } from '../../domain/rules/authValidation';
import type {
  FieldIssues,
  SignInField,
} from '../../domain/rules/authValidation';
import type { AuthService } from '../../domain/services/AuthService';

export function useSignInForm(
  authService: AuthService,
  onSignedIn: (session: AuthSession) => void,
) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [issues, setIssues] = useState<FieldIssues<SignInField>>({});
  const [failure, setFailure] = useState<AppErrorCode | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const inFlight = useRef(false);

  const submit = useCallback(async () => {
    if (inFlight.current) {
      return;
    }
    const validation = validateSignIn({ email, password });
    if (!validation.ok) {
      setIssues(validation.error);
      setFailure(null);
      return;
    }
    inFlight.current = true;
    setIssues({});
    setFailure(null);
    setSubmitting(true);
    const result = await authService.signIn(validation.value);
    inFlight.current = false;
    setSubmitting(false);
    if (result.ok) {
      onSignedIn(result.value);
    } else {
      setFailure(result.error.code);
    }
  }, [authService, email, onSignedIn, password]);

  return {
    email,
    password,
    issues,
    failure,
    submitting,
    changeEmail: (value: string) => {
      setEmail(value);
      setIssues(current => ({ ...current, email: undefined }));
    },
    changePassword: (value: string) => {
      setPassword(value);
      setIssues(current => ({ ...current, password: undefined }));
    },
    submit,
  };
}
