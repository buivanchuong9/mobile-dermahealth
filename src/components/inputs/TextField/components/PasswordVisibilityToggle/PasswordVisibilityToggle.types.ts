export type PasswordVisibilityToggleProps = {
  readonly revealed: boolean;
  readonly onToggle: () => void;
  readonly testID?: string;
};
