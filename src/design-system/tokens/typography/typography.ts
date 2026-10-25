export type TextStyleToken = {
  readonly fontSize: number;
  readonly lineHeight: number;
  readonly fontWeight: '400' | '500' | '600' | '700';
  readonly letterSpacing?: number;
};

export const typography = {
  display: { fontSize: 32, lineHeight: 40, fontWeight: '700' },
  title: { fontSize: 24, lineHeight: 32, fontWeight: '600' },
  subtitle: { fontSize: 18, lineHeight: 24, fontWeight: '600' },
  body: { fontSize: 16, lineHeight: 24, fontWeight: '400' },
  bodyStrong: { fontSize: 16, lineHeight: 24, fontWeight: '600' },
  caption: { fontSize: 13, lineHeight: 18, fontWeight: '400' },
  button: { fontSize: 16, lineHeight: 20, fontWeight: '600' },
  buttonSmall: { fontSize: 14, lineHeight: 18, fontWeight: '600' },
} as const satisfies Record<string, TextStyleToken>;

export type Typography = typeof typography;
