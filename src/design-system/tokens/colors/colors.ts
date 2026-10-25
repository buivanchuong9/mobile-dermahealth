export const palette = {
  white: '#FFFFFF',
  blue50: '#F5F9FF',
  blue100: '#DBEAFE',
  blue600: '#2563EB',
  blue700: '#1D4ED8',
  navy900: '#172B4D',
  slate500: '#64748B',
  slate400: '#94A3B8',
  slate200: '#E2E8F0',
  green700: '#15803D',
  amber700: '#B45309',
  red700: '#B91C1C',
} as const;

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
};
