import { StyleSheet, View } from 'react-native';
import {
  buildCareJourney,
  routeForNextAction,
  selectJourneyAppointment,
} from '@modules/journey';
import { Button, Typography } from '@design-system/primitives';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import type { NextStepCardProps } from './NextStepCard.types';

/** The single most important thing the patient should do next. */
export function NextStepCard({
  appointments,
  queue,
  now,
  actions,
}: NextStepCardProps) {
  const theme = useTheme();
  const appointment = selectJourneyAppointment(appointments, queue);

  let title: string;
  let body: string;
  let actionLabel: string;
  let onPress: () => void;

  if (appointment === null) {
    title = translate('home.nextStep.none.title');
    body = translate('home.nextStep.none.body');
    actionLabel = translate('home.nextStep.none.action');
    onPress = actions.onBookAppointment;
  } else {
    const { nextAction } = buildCareJourney({ appointment, queue, now });
    title = translate(`journey.nextAction.${nextAction}.title`);
    body = translate(`journey.nextAction.${nextAction}.body`);
    actionLabel = translate(`journey.nextAction.${nextAction}.action`);
    const route = routeForNextAction(nextAction);
    onPress = () => {
      switch (route) {
        case 'appointment_detail':
          return actions.onOpenAppointment(appointment.id);
        case 'check_in':
          return actions.onCheckIn(appointment.id);
        case 'queue':
          return actions.onOpenQueue();
        case 'records':
          return actions.onOpenRecords();
        case 'booking':
          return actions.onBookFollowUp();
      }
    };
  }

  return (
    <View
      style={[
        styles.card,
        {
          padding: theme.spacing[5],
          gap: theme.spacing[3],
          borderRadius: theme.radius.xl,
          backgroundColor: theme.colors.brand.primaryDark,
        },
      ]}
      testID="home-next-step"
    >
      <Typography variant="caption" tone="onBrand">
        {translate('journey.nextAction.title')}
      </Typography>
      <Typography variant="title" tone="onBrand" accessibilityRole="header">
        {title}
      </Typography>
      <Typography tone="onBrand">{body}</Typography>
      <Button
        label={actionLabel}
        variant="secondary"
        onPress={onPress}
        fullWidth
        testID="home-next-step-action"
      />
    </View>
  );
}

const styles = StyleSheet.create({ card: { alignItems: 'stretch' } });
