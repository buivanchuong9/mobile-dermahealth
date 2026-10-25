import type { ButtonPressFeedback } from './Button.types';

const RIPPLE_ALPHA_SUFFIX = '29'; // ~16% opacity on a #RRGGBB color

/** Android: Material ripple tinted with the label color, clipped to the shape. */
export function getPressFeedback(rippleBase: string): ButtonPressFeedback {
  return {
    platform: 'android',
    pressableProps: {
      android_ripple: { color: `${rippleBase}${RIPPLE_ALPHA_SUFFIX}` },
    },
    containerStyle: { overflow: 'hidden' },
    getPressedStyle: () => ({}),
  };
}
