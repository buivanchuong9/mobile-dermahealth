import { useCallback, useRef, useState } from 'react';
import { validateForgotPassword } from '../../../utils/authentication/authValidation';
import type { FieldIssue } from '../../../utils/authentication/authValidation';
import type { AuthService } from '../../../model/authentication/AuthService';

export function useForgotPasswordForm(authService: AuthService) {
  const [email, setEmail] = useState('');
  const [issue, setIssue] = useState<FieldIssue | null>(null);
  const [failed, setFailed] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const inFlight = useRef(false);

  const submit = useCallback(async () => {
    if (inFlight.current) {
      return;
    }
    const validation = validateForgotPassword({ email });
    if (!validation.ok) {
      setIssue(validation.error.email ?? null);
      return;
    }
    inFlight.current = true;
    setIssue(null);
    setFailed(false);
    setSubmitting(true);
    const result = await authService.requestPasswordReset(
      validation.value.email,
    );
    inFlight.current = false;
    setSubmitting(false);
    if (result.ok) {
      setSentTo(validation.value.email);
    } else {
      setFailed(true);
    }
  }, [authService, email]);

  return {
    email,
    issue,
    failed,
    sentTo,
    submitting,
    changeEmail: (value: string) => {
      setEmail(value);
      setIssue(null);
    },
    submit,
  };
}
