import { ConfirmDialog } from '@components/overlays';
import { translate } from '@i18n';
import { formatAppointmentWhen } from '../../../formatters';
import type { CancelAppointmentDialogProps } from './CancelAppointmentDialog.types';

export function CancelAppointmentDialog({
  visible,
  startsAt,
  loading,
  onConfirm,
  onCancel,
}: CancelAppointmentDialogProps) {
  return (
    <ConfirmDialog
      visible={visible}
      title={translate('appointments.detail.cancelDialog.title')}
      message={translate('appointments.detail.cancelDialog.message', {
        time: formatAppointmentWhen(startsAt),
      })}
      confirmLabel={translate('appointments.detail.cancelDialog.confirm')}
      cancelLabel={translate('appointments.detail.cancelDialog.keep')}
      destructive
      loading={loading}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}
