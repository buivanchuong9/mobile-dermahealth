import { useState } from 'react';
import { TextInput, View } from 'react-native';
import { Icon, Typography } from '../../primitives';
import { useTheme } from '../../../styles/theme';
import type { TextFieldProps } from './TextField.types';
import { FieldMessage } from './components/FieldMessage';
import { PasswordVisibilityToggle } from './components/PasswordVisibilityToggle';
import { styles } from './TextField.styles';

export function TextField({
  label,
  value,
  onChangeText,
  placeholder,
  helperText,
  errorMessage,
  secureTextEntry = false,
  leftIcon,
  keyboardType,
  autoCapitalize = 'none',
  autoComplete = 'off',
  returnKeyType,
  editable = true,
  onSubmitEditing,
  inputRef,
  testID,
}: TextFieldProps) {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const hasError = errorMessage !== undefined && errorMessage !== '';

  const borderColor = hasError
    ? theme.colors.status.error
    : focused
    ? theme.colors.brand.primary
    : theme.colors.border.default;

  return (
    <View style={{ gap: theme.spacing[1] }}>
      <Typography variant="bodyStrong">{label}</Typography>
      <View
        style={[
          styles.field,
          {
            borderColor,
            borderRadius: theme.radius.md,
            paddingHorizontal: theme.spacing[3],
            gap: theme.spacing[2],
            backgroundColor: editable
              ? theme.colors.surface.primary
              : theme.colors.state.disabledBackground,
          },
        ]}
      >
        {leftIcon ? (
          <Icon name={leftIcon} size={20} color={theme.colors.text.secondary} />
        ) : null}
        <TextInput
          ref={inputRef}
          accessibilityLabel={label}
          accessibilityHint={hasError ? errorMessage : helperText}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.text.secondary}
          secureTextEntry={secureTextEntry && !revealed}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          autoCorrect={false}
          returnKeyType={returnKeyType}
          editable={editable}
          onSubmitEditing={onSubmitEditing}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={[
            theme.typography.body,
            styles.input,
            { color: theme.colors.text.primary },
          ]}
          testID={testID}
        />
        {secureTextEntry ? (
          <PasswordVisibilityToggle
            revealed={revealed}
            onToggle={() => setRevealed(current => !current)}
            testID={testID ? `${testID}-toggle` : undefined}
          />
        ) : null}
      </View>
      <FieldMessage
        errorMessage={errorMessage}
        helperText={helperText}
        testID={testID ? `${testID}-error` : undefined}
      />
    </View>
  );
}
