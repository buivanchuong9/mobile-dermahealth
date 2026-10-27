import { err, ok } from '@model/common';
import type { Result } from '@model/common';

export type FieldIssue =
  | 'required'
  | 'invalid_email'
  | 'weak_password'
  | 'invalid_phone'
  | 'passwords_mismatch'
  | 'terms_required';

export type FieldIssues<Field extends string> = Partial<
  Record<Field, FieldIssue>
>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const VN_PHONE_PATTERN = /^0\d{9}$/;

export function checkEmail(value: string): FieldIssue | null {
  const email = value.trim();
  if (email === '') {
    return 'required';
  }
  return EMAIL_PATTERN.test(email) ? null : 'invalid_email';
}

export function checkNewPassword(value: string): FieldIssue | null {
  if (value === '') {
    return 'required';
  }
  const strong =
    value.length >= 8 && /[A-Za-z]/.test(value) && /\d/.test(value);
  return strong ? null : 'weak_password';
}

function finish<Field extends string, T>(
  issues: FieldIssues<Field>,
  value: T,
): Result<T, FieldIssues<Field>> {
  return Object.keys(issues).length === 0 ? ok(value) : err(issues);
}

export type SignInField = 'email' | 'password';

export function validateSignIn(input: {
  readonly email: string;
  readonly password: string;
}): Result<{ email: string; password: string }, FieldIssues<SignInField>> {
  const issues: FieldIssues<SignInField> = {};
  const email = checkEmail(input.email);
  if (email) {
    issues.email = email;
  }
  if (input.password === '') {
    issues.password = 'required';
  }
  return finish(issues, {
    email: input.email.trim(),
    password: input.password,
  });
}

export type RegistrationField =
  | 'fullName'
  | 'email'
  | 'phone'
  | 'password'
  | 'confirmPassword'
  | 'terms';

export function validateRegistration(input: {
  readonly fullName: string;
  readonly email: string;
  readonly phone: string;
  readonly password: string;
  readonly confirmPassword: string;
  readonly acceptedTerms: boolean;
}): Result<
  { fullName: string; email: string; phone: string; password: string },
  FieldIssues<RegistrationField>
> {
  const issues: FieldIssues<RegistrationField> = {};
  if (input.fullName.trim().length < 2) {
    issues.fullName = 'required';
  }
  const email = checkEmail(input.email);
  if (email) {
    issues.email = email;
  }
  if (input.phone.trim() === '') {
    issues.phone = 'required';
  } else if (!VN_PHONE_PATTERN.test(input.phone.trim())) {
    issues.phone = 'invalid_phone';
  }
  const password = checkNewPassword(input.password);
  if (password) {
    issues.password = password;
  }
  if (input.confirmPassword === '') {
    issues.confirmPassword = 'required';
  } else if (input.confirmPassword !== input.password) {
    issues.confirmPassword = 'passwords_mismatch';
  }
  if (!input.acceptedTerms) {
    issues.terms = 'terms_required';
  }
  return finish(issues, {
    fullName: input.fullName.trim(),
    email: input.email.trim(),
    phone: input.phone.trim(),
    password: input.password,
  });
}

export function validateForgotPassword(input: {
  readonly email: string;
}): Result<{ email: string }, FieldIssues<'email'>> {
  const email = checkEmail(input.email);
  return finish(email ? { email } : {}, { email: input.email.trim() });
}
