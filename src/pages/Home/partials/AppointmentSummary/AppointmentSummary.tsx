import { View } from 'react-native';
import { AppointmentCard, pickNextAppointment } from '@pages/Appointments';
import { Button, Typography } from '@components/primitives';
import { useTheme } from '@styles/theme';
import { translate } from '@i18n';
import type { AppointmentSummaryProps } from './AppointmentSummary.types';

export function AppointmentSummary({
  appointments,
  onOpenAppointment,
  onOpenAppointments,
  onBookAppointment,
}: AppointmentSummaryProps) {
  const theme = useTheme();
  const next = pickNextAppointment(appointments);
  return (
    <View style={{ gap: theme.spacing[2] }} testID="home-appointments">
      <Typography variant="subtitle" accessibilityRole="header">
        {translate('home.appointments.title')}
      </Typography>
      {next ? (
        <View style={{ gap: theme.spacing[2] }}>
          <AppointmentCard appointment={next} onPress={onOpenAppointment} />
          <Button
            label={translate('home.appointments.viewAll')}
            variant="ghost"
            size="sm"
            onPress={onOpenAppointments}
            testID="home-appointments-all"
          />
        </View>
      ) : (
        <>
          <Typography tone="secondary">
            {translate('home.appointments.empty')}
          </Typography>
          <Button
            label={translate('home.appointments.book')}
            variant="secondary"
            onPress={onBookAppointment}
            fullWidth
          />
        </>
      )}
    </View>
  );
}
