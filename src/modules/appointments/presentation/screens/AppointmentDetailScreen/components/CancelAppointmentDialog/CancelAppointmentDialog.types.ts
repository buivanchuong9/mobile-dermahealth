import type { LocalDateTime } from '@shared/utilities/localDateTime';

export type CancelAppointmentDialogProps = {
  readonly visible: boolean;
  readonly startsAt: LocalDateTime;
  readonly loading: boolean;
  readonly onConfirm: () => void;
  readonly onCancel: () => void;
};
