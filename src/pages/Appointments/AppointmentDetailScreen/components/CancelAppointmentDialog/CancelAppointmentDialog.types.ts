import type { LocalDateTime } from '@utils/localDateTime';

export type CancelAppointmentDialogProps = {
  readonly visible: boolean;
  readonly startsAt: LocalDateTime;
  readonly loading: boolean;
  readonly onConfirm: () => void;
  readonly onCancel: () => void;
};
