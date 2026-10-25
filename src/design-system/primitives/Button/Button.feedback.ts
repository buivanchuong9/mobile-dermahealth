import type { ButtonPressFeedback } from './Button.types';

const PRESSED_OPACITY = 0.7;

/** Default and iOS: dim the button while pressed. */
/** `rippleBase` is only used by the Android implementation (same signature). */
export function getPressFeedback(_rippleBase: string): ButtonPressFeedback {
  return {
    platform: 'ios',
    pressableProps: {},
    containerStyle: {},
    getPressedStyle: pressed => (pressed ? { opacity: PRESSED_OPACITY } : {}),
  };
}
