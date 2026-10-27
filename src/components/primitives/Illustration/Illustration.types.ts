export type IllustrationName =
  | 'welcome'
  | 'booking'
  | 'queue'
  | 'records'
  | 'assessment'
  | 'account';

export type IllustrationProps = {
  readonly name: IllustrationName;
  /** Rendered width; height follows the 6:5 artboard. */
  readonly width?: number;
  /** `onBrand` for placement on the brand gradient. */
  readonly tone?: 'default' | 'onBrand';
};

export type IllustrationPalette = {
  readonly primary: string;
  readonly primaryDark: string;
  readonly soft: string;
  /** Always-light tint for shapes drawn on white cards. */
  readonly tile: string;
  readonly surface: string;
  readonly line: string;
  readonly success: string;
};
