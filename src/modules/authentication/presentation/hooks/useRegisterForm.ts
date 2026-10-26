import { useCallback, useRef, useState } from 'react';
import type { AppErrorCode } from '@core/contracts';
import type { AuthSession } from '../../domain/entities/AuthSession';
import { validateRegistration } from '../../domain/rules/authValidation';
import type {
  FieldIssues,
  RegistrationField,
} from '../../domain/rules/authValidation';
import type { AuthService } from '../../domain/services/AuthService';
import type { RegistrationFormValues } from './useRegisterForm.types';

const EMPTY: RegistrationFormValues = {
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  acceptedTerms: false,
};

export function useRegisterForm(
  authService: AuthService,
  onRegistered: (session: AuthSession) => void,
) {
  const [values, setValues] = useState<RegistrationFormValues>(EMPTY);
  const [issues, setIssues] = useState<FieldIssues<RegistrationField>>({});
  const [failure, setFailure] = useState<AppErrorCode | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const inFlight = useRef(false);

  const change = useCallback(
    <K extends keyof RegistrationFormValues>(
      key: K,
      value: RegistrationFormValues[K],
    ) => {
      setValues(current => ({ ...current, [key]: value }));
      const issueKey: RegistrationField =
        key === 'acceptedTerms' ? 'terms' : key;
      setIssues(current => ({ ...current, [issueKey]: undefined }));
    },
    [],
  );

  const submit = useCallback(async () => {
    if (inFlight.current) {
      return;
    }
    const validation = validateRegistration(values);
    if (!validation.ok) {
      setIssues(validation.error);
      setFailure(null);
      return;
    }
    inFlight.current = true;
    setIssues({});
    setFailure(null);
    setSubmitting(true);
    const result = await authService.register(validation.value);
    inFlight.current = false;
    setSubmitting(false);
    if (result.ok) {
      onRegistered(result.value);
    } else {
      setFailure(result.error.code);
    }
  }, [authService, onRegistered, values]);

  return { values, issues, failure, submitting, change, submit };
}
