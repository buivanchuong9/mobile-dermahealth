import { StyleSheet, View } from 'react-native';
import { EmptyState, SkeletonCard, SuccessMark } from '@design-system/feedback';
import { Banner } from '@design-system/feedback';
import { Button, Typography } from '@design-system/primitives';
import { ScreenContainer } from '@design-system/surfaces';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import { useAsyncQuery } from '@shared/hooks';
import { useCallback } from 'react';
import type { AppointmentRepository } from '../../../domain/repositories/AppointmentRepository';
import { BookingSummary } from '../../components/BookingSummary';
import { findConfirmedDoctor } from './findConfirmedDoctor';

export type BookingConfirmationScreenProps = {
  readonly repository: AppointmentRepository;
  readonly appointmentId: string;
  readonly rescheduled: boolean;
  readonly onViewDetail: (appointmentId: string) => void;
  readonly onGoHome: () => void;
};

export function BookingConfirmationScreen({
  repository,
  appointmentId,
  rescheduled,
  onViewDetail,
  onGoHome,
}: BookingConfirmationScreenProps) {
  const theme = useTheme();
  const load = useCallback(
    () => repository.get(appointmentId),
    [repository, appointmentId],
  );
  const query = useAsyncQuery(load);

  return (
    <ScreenContainer background="primary">
      <View
        style={[
          styles.hero,
          { gap: theme.spacing[3], paddingTop: theme.spacing[6] },
        ]}
      >
        <SuccessMark />
        <Typography variant="title" align="center" accessibilityRole="header">
          {translate(
            rescheduled
              ? 'appointments.confirmation.rescheduledTitle'
              : 'appointments.confirmation.bookedTitle',
          )}
        </Typography>
      </View>

      <Banner
        tone="info"
        message={translate('appointments.confirmation.simulatedBody')}
      />

      {query.status === 'loading' ? <SkeletonCard /> : null}
      {query.status === 'error' ? (
        <EmptyState
          icon="triangle-alert"
          title={translate('appointments.detail.notFound')}
        />
      ) : null}
      {query.status === 'ready' ? (
        <BookingSummary
          doctor={findConfirmedDoctor(query.data)}
          startsAt={query.data.startsAt}
          consultationType={query.data.consultationType}
        />
      ) : null}

      <View style={{ gap: theme.spacing[2] }}>
        <Button
          label={translate('appointments.confirmation.viewDetail')}
          onPress={() => onViewDetail(appointmentId)}
          fullWidth
          testID="confirmation-view-detail"
        />
        <Button
          label={translate('appointments.confirmation.backHome')}
          variant="ghost"
          onPress={onGoHome}
          fullWidth
          testID="confirmation-home"
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({ hero: { alignItems: 'center' } });
