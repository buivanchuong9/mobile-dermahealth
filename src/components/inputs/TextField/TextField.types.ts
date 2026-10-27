import type { TextInput } from 'react-native';
import type { KeyboardTypeOptions, ReturnKeyTypeOptions } from 'react-native';
import type { ComponentRef, Ref } from 'react';
import type { IconName } from '../../primitives';

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
