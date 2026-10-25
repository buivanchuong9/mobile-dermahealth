export const palette = {
  white: '#FFFFFF',
  blue50: '#F5F9FF',
  blue100: '#DBEAFE',
  blue600: '#2563EB',
  blue700: '#1D4ED8',
  navy900: '#172B4D',
  slate500: '#64748B',
  slate400: '#94A3B8',
  slate600: '#475569',
  slate200: '#E2E8F0',
  slate100: '#F1F5F9',
  green800: '#166534',
  green100: '#DCFCE7',
  amber800: '#92400E',
  amber100: '#FEF3C7',
  red800: '#991B1B',
  red100: '#FEE2E2',
  green700: '#15803D',
  amber700: '#B45309',
  red700: '#B91C1C',
} as const;

export type FeedbackColors = {
  readonly background: string;
  readonly foreground: string;
};

export type ThemeColors = {
  readonly background: { readonly primary: string; readonly secondary: string };
  readonly surface: { readonly primary: string };
  readonly brand: {
    readonly primary: string;
    readonly primaryDark: string;
    readonly primaryLight: string;
  };
  readonly text: {
    readonly primary: string;
    readonly secondary: string;
    readonly onBrand: string;
    readonly onBrandLight: string;
    readonly disabled: string;
  };
  readonly border: { readonly default: string };
  readonly status: {
    readonly success: string;
    readonly warning: string;
    readonly error: string;
  };
  readonly state: { readonly disabledBackground: string };
  /** Tinted background + readable foreground for badges and banners. */
  readonly feedback: {
    readonly success: FeedbackColors;
    readonly warning: FeedbackColors;
    readonly danger: FeedbackColors;
    readonly info: FeedbackColors;
    readonly neutral: FeedbackColors;
  };
  readonly overlay: { readonly scrim: string };
};

export const lightColors: ThemeColors = {
  background: { primary: palette.white, secondary: palette.blue50 },
  surface: { primary: palette.white },
  brand: {
    primary: palette.blue600,
    primaryDark: palette.blue700,
    primaryLight: palette.blue100,
  },
  text: {
    primary: palette.navy900,
    secondary: palette.slate500,
    onBrand: palette.white,
    onBrandLight: palette.blue700,
    disabled: palette.slate400,
  },
  border: { default: palette.slate200 },
  status: {
    success: palette.green700,
    warning: palette.amber700,
    error: palette.red700,
  },
  state: { disabledBackground: palette.slate200 },
  feedback: {
    success: { background: palette.green100, foreground: palette.green800 },
    warning: { background: palette.amber100, foreground: palette.amber800 },
    danger: { background: palette.red100, foreground: palette.red800 },
    info: { background: palette.blue100, foreground: palette.blue700 },
    neutral: { background: palette.slate100, foreground: palette.slate600 },
  },
  overlay: { scrim: 'rgba(23, 43, 77, 0.5)' },
};
