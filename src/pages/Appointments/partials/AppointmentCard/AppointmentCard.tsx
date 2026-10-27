import { View } from 'react-native';
import { Card } from '@components/surfaces';
import { Icon, PressableScale, Typography } from '@components/primitives';
import { useTheme } from '@styles/theme';
import { translate } from '@i18n';
import {
  formatDayOfMonth,
  formatTime,
  formatWeekdayShort,
  formatDayMonth,
} from '@utils/localDateTime';
import { AppointmentStatusBadge } from '../AppointmentStatusBadge';
import type { AppointmentCardProps } from './AppointmentCard.types';
import { styles } from './AppointmentCard.styles';

export function AppointmentCard({
  appointment,
  onPress,
}: AppointmentCardProps) {
  const theme = useTheme();
  const kind = translate(`appointments.kind.${appointment.kind}`);
  const type = translate(
    `appointments.consultationType.${appointment.consultationType}`,
  );
  const summary = `${appointment.doctorName}, ${translate(
    `appointments.specialty.${appointment.specialtyId}`,
  )}`;
  const label = `${kind}. ${summary}. ${formatWeekdayShort(
    appointment.startsAt,
  )} ${formatDayMonth(appointment.startsAt)} ${formatTime(
    appointment.startsAt,
  )}. ${translate(`appointments.status.${appointment.status}`)}`;

  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={() => onPress(appointment.id)}
      testID={`appointment-${appointment.id}`}
    >
      <Card>
        <View style={[styles.row, { gap: theme.spacing[3] }]}>
          <View
            style={[
              styles.dateBlock,
              {
                borderRadius: theme.radius.md,
                backgroundColor: theme.colors.feedback.info.background,
              },
            ]}
          >
            <Typography variant="caption" tone="brand">
              {formatWeekdayShort(appointment.startsAt)}
            </Typography>
            <Typography variant="title" tone="brand">
              {formatDayOfMonth(appointment.startsAt)}
            </Typography>
            <Typography variant="caption" tone="brand">
              {formatDayMonth(appointment.startsAt).slice(3)}
            </Typography>
          </View>
          <View style={styles.body}>
            <Typography variant="caption" tone="secondary">
              {kind}
            </Typography>
            <Typography variant="bodyStrong">
              {appointment.doctorName}
            </Typography>
            <Typography variant="caption" tone="secondary">
              {translate(`appointments.specialty.${appointment.specialtyId}`)}
            </Typography>
            <View
              style={[
                styles.row,
                { gap: theme.spacing[1], marginTop: theme.spacing[1] },
              ]}
            >
              <Icon
                name="clock"
                size={14}
                color={theme.colors.text.secondary}
              />
              <Typography variant="caption">
                {formatTime(appointment.startsAt)} · {type}
              </Typography>
            </View>
          </View>
        </View>
        <AppointmentStatusBadge status={appointment.status} />
      </Card>
    </PressableScale>
  );
}
