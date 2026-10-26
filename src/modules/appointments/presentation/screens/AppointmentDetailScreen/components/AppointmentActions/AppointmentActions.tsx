import { View } from 'react-native';
import { Button, Typography } from '@design-system/primitives';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import type { AppointmentActionsProps } from './AppointmentActions.types';

export function AppointmentActions({
  appointment,
  canCheckIn,
  checkingIn,
  changeBlockReason,
  onCheckIn,
  onReschedule,
  onRequestCancel,
}: AppointmentActionsProps) {
  const theme = useTheme();
  const showCheckIn =
    appointment.consultationType === 'in_person' &&
    appointment.status === 'confirmed';
  return (
    <View style={{ gap: theme.spacing[2] }}>
      {showCheckIn ? (
        <>
          <Button
            label={translate('appointments.detail.checkIn')}
            onPress={onCheckIn}
            loading={checkingIn}
            disabled={!canCheckIn}
            fullWidth
            testID="appointment-check-in"
          />
          {canCheckIn ? null : (
            <Typography variant="caption" tone="secondary">
              {translate('appointments.detail.checkInHint')}
            </Typography>
          )}
        </>
      ) : null}
      <Button
        label={translate('appointments.detail.reschedule')}
        variant="secondary"
        onPress={onReschedule}
        disabled={changeBlockReason !== null}
        fullWidth
        testID="appointment-reschedule"
      />
      <Button
        label={translate('appointments.detail.cancel')}
        variant="ghost"
        onPress={onRequestCancel}
        disabled={changeBlockReason !== null}
        fullWidth
        testID="appointment-cancel"
      />
      {changeBlockReason ? (
        <Typography variant="caption" tone="secondary">
          {translate(`appointments.detail.blocked.${changeBlockReason}`)}
        </Typography>
      ) : null}
    </View>
  );
}
