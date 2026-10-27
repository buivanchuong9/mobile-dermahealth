export type MessageComposerProps = {
  readonly value: string;
  readonly onChangeText: (value: string) => void;
  readonly onSend: () => void;
};
