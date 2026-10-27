import type { ReactNode } from 'react';
import type { Typography as TypographyTokens } from '../../../styles/tokens';

export type TypographyVariant = Exclude<
  keyof TypographyTokens,
  'button' | 'buttonSmall'
>;

export type TypographyTone =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'brand'
  | 'onBrand';

export type TypographyProps = {
  readonly children: ReactNode;
  readonly variant?: TypographyVariant;
  readonly tone?: TypographyTone;
  readonly align?: 'left' | 'center' | 'right';
  readonly numberOfLines?: number;
  readonly accessibilityRole?: 'header' | 'alert' | 'text';
  readonly accessibilityLiveRegion?: 'none' | 'polite' | 'assertive';
  readonly testID?: string;
};
