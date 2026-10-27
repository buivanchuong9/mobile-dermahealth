import { useRef } from 'react';
import { View } from 'react-native';
import { TextField } from '@components/inputs';
import type { TextFieldHandle } from '@components/inputs';
import { useTheme } from '@styles/theme';
import { translate } from '@i18n';
import { getIssueMessage } from '../../../issueMessage';
import type { RegistrationFieldsProps } from './RegistrationFields.types';

/** The five registration inputs, chained so "next" moves focus forward. */
export function RegistrationFields({
  values,
  issues,
  disabled,
  onChange,
  onSubmit,
}: RegistrationFieldsProps) {
  const theme = useTheme();
  const emailRef = useRef<TextFieldHandle>(null);
  const phoneRef = useRef<TextFieldHandle>(null);
  const passwordRef = useRef<TextFieldHandle>(null);
  const confirmRef = useRef<TextFieldHandle>(null);

  return (
    <View style={{ gap: theme.spacing[3] }}>
      <TextField
        label={translate('auth.fields.fullName')}
        placeholder={translate('auth.fields.fullNamePlaceholder')}
        value={values.fullName}
        onChangeText={value => onChange('fullName', value)}
        errorMessage={getIssueMessage(issues.fullName)}
        leftIcon="user"
        autoCapitalize="words"
        autoComplete="name"
        returnKeyType="next"
        onSubmitEditing={() => emailRef.current?.focus()}
        editable={!disabled}
        testID="register-name"
      />
      <TextField
        label={translate('auth.fields.email')}
        placeholder={translate('auth.fields.emailPlaceholder')}
        value={values.email}
        onChangeText={value => onChange('email', value)}
        errorMessage={getIssueMessage(issues.email)}
        leftIcon="mail"
        keyboardType="email-address"
        autoComplete="email"
        returnKeyType="next"
        onSubmitEditing={() => phoneRef.current?.focus()}
        editable={!disabled}
        inputRef={emailRef}
        testID="register-email"
      />
      <TextField
        label={translate('auth.fields.phone')}
        placeholder={translate('auth.fields.phonePlaceholder')}
        helperText={translate('auth.hints.phone')}
        value={values.phone}
        onChangeText={value => onChange('phone', value)}
        errorMessage={getIssueMessage(issues.phone)}
        leftIcon="phone"
        keyboardType="phone-pad"
        autoComplete="tel"
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current?.focus()}
        editable={!disabled}
        inputRef={phoneRef}
        testID="register-phone"
      />
      <TextField
        label={translate('auth.fields.newPassword')}
        helperText={translate('auth.hints.password')}
        value={values.password}
        onChangeText={value => onChange('password', value)}
        errorMessage={getIssueMessage(issues.password)}
        leftIcon="lock"
        secureTextEntry
        autoComplete="new-password"
        returnKeyType="next"
        onSubmitEditing={() => confirmRef.current?.focus()}
        editable={!disabled}
        inputRef={passwordRef}
        testID="register-password"
      />
      <TextField
        label={translate('auth.fields.confirmPassword')}
        value={values.confirmPassword}
        onChangeText={value => onChange('confirmPassword', value)}
        errorMessage={getIssueMessage(issues.confirmPassword)}
        leftIcon="lock"
        secureTextEntry
        autoComplete="new-password"
        returnKeyType="done"
        onSubmitEditing={onSubmit}
        editable={!disabled}
        inputRef={confirmRef}
        testID="register-confirm"
      />
    </View>
  );
}
