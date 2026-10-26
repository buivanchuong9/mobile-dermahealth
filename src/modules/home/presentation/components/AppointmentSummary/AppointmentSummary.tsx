import { View } from 'react-native';
import { AppointmentCard, pickNextAppointment } from '@modules/appointments';
import { Button, Typography } from '@design-system/primitives';
import { SectionCard } from '@design-system/surfaces';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
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
    <SectionCard
      title={translate('home.appointments.title')}
      testID="home-appointments"
    >
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
    </SectionCard>
  );
}
