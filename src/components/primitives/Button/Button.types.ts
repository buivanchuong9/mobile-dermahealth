import type { PressableProps, ViewStyle } from 'react-native';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = {
  readonly label: string;
  readonly onPress: () => void;
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly disabled?: boolean;
  /** Shows a spinner and ignores presses while an action is in progress. */
  readonly loading?: boolean;
  readonly fullWidth?: boolean;
  /** Overrides the spoken label; defaults to `label`. */
  readonly accessibilityLabel?: string;
  readonly accessibilityHint?: string;
  readonly testID?: string;
};

/**
 * Platform-specific press feedback. Resolved by Metro through
 * `Button.feedback.ts` (default, iOS) and `Button.feedback.android.ts`.
 */
export type ButtonPressFeedback = {
  readonly platform: 'ios' | 'android';
  readonly pressableProps: Pick<PressableProps, 'android_ripple'>;
  readonly containerStyle: ViewStyle;
  /** Opacity while pressed; 1 when the platform ripple is the cue. */
  readonly pressedOpacity: number;
};
