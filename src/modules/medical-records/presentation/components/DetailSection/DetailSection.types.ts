export type DetailSectionProps = {
  readonly title: string;
  readonly items: readonly {
    readonly primary: string;
    readonly secondary?: string;
  }[];
};
