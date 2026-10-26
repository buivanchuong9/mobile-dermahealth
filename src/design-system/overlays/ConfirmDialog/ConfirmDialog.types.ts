export type ConfirmDialogProps = {
  readonly visible: boolean;
  readonly title: string;
  readonly message: string;
  readonly confirmLabel: string;
  readonly cancelLabel?: string;
  /** Uses the danger style for irreversible actions. */
  readonly destructive?: boolean;
  readonly loading?: boolean;
  readonly onConfirm: () => void;
  readonly onCancel: () => void;
};
