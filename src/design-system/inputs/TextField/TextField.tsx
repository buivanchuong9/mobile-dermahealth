import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import type { KeyboardTypeOptions, ReturnKeyTypeOptions } from 'react-native';
import type { ComponentRef, Ref } from 'react';
import { translate } from '@shared/localization';
import { MIN_TOUCH_TARGET } from '../../accessibility';
import { Icon } from '../../primitives';
import type { IconName } from '../../primitives';
import { Typography } from '../../primitives';
import { useTheme } from '../../theme';

/** Instance type of the underlying input, for focus management. */
export type TextFieldHandle = ComponentRef<typeof TextInput>;

export type TextFieldProps = {
  readonly label: string;
  readonly value: string;
  readonly onChangeText: (value: string) => void;
  readonly placeholder?: string;
  readonly helperText?: string;
  readonly errorMessage?: string;
  /** Hides the text and adds a show/hide toggle. */
  readonly secureTextEntry?: boolean;
  readonly leftIcon?: IconName;
  readonly keyboardType?: KeyboardTypeOptions;
  readonly autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  readonly autoComplete?:
    | 'email'
    | 'name'
    | 'tel'
    | 'new-password'
    | 'current-password'
    | 'off';
  readonly returnKeyType?: ReturnKeyTypeOptions;
  readonly editable?: boolean;
  readonly onSubmitEditing?: () => void;
  readonly inputRef?: Ref<TextFieldHandle>;
  readonly testID?: string;
};

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
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={translate(
              revealed ? 'common.hidePassword' : 'common.showPassword',
            )}
            hitSlop={8}
            onPress={() => setRevealed(current => !current)}
            style={styles.toggle}
            testID={testID ? `${testID}-toggle` : undefined}
          >
            <Icon
              name={revealed ? 'eye-off' : 'eye'}
              size={20}
              color={theme.colors.text.secondary}
            />
          </Pressable>
        ) : null}
      </View>
      {hasError ? (
        <Typography
          variant="caption"
          tone="error"
          accessibilityRole="alert"
          accessibilityLiveRegion="polite"
          testID={testID ? `${testID}-error` : undefined}
        >
          {errorMessage}
        </Typography>
      ) : helperText ? (
        <Typography variant="caption" tone="secondary">
          {helperText}
        </Typography>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    minHeight: MIN_TOUCH_TARGET + 8,
  },
  input: { flex: 1, paddingVertical: 10 },
  toggle: {
    width: MIN_TOUCH_TARGET - 8,
    height: MIN_TOUCH_TARGET - 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
