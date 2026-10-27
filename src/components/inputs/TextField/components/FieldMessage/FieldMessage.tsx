import { Typography } from '../../../../primitives';
import type { FieldMessageProps } from './FieldMessage.types';

/** Error (announced) or helper text under a field; nothing when both empty. */
export function FieldMessage({
  errorMessage,
  helperText,
  testID,
}: FieldMessageProps) {
  if (errorMessage) {
    return (
      <Typography
        variant="caption"
        tone="error"
        accessibilityRole="alert"
        accessibilityLiveRegion="polite"
        testID={testID}
      >
        {errorMessage}
      </Typography>
    );
  }
  if (helperText) {
    return (
      <Typography variant="caption" tone="secondary">
        {helperText}
      </Typography>
    );
  }
  return null;
}
