export type SelectableCardProps = {
  readonly label: string;
  readonly description?: string;
  readonly selected: boolean;
  readonly onPress: () => void;
  /** `radio` for exactly-one choices, `checkbox` for multiple choices. */
  readonly role: 'radio' | 'checkbox';
  readonly disabled?: boolean;
  readonly testID?: string;
};
