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
};

export type IllustrationPalette = {
  readonly primary: string;
  readonly primaryDark: string;
  readonly soft: string;
  readonly surface: string;
  readonly line: string;
  readonly success: string;
};
