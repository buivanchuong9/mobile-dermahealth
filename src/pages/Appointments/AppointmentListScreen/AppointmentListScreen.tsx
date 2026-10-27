import { View } from 'react-native';
import { SegmentedTabs } from '@components/navigation';
import { ScreenHeader } from '@components/navigation';
import { ScreenContainer } from '@components/surfaces';
import { Button, Typography } from '@components/primitives';
import {
  EmptyState,
  SimulationBanner,
  SkeletonGroup,
  SkeletonRow,
} from '@components/feedback';
import { FadeInView, staggerDelay } from '@components/motion';
import { useTheme } from '@styles/theme';
import { translate } from '@i18n';
import type { AppointmentTab } from '../../../utils/appointments/appointmentRules';
import { AppointmentCard } from '../partials/AppointmentCard';
import {
  APPOINTMENT_TABS,
  useAppointmentList,
} from '../hooks/useAppointmentList';
import type { AppointmentListScreenProps } from './AppointmentListScreen.types';
import { EMPTY_KEY, TAB_LABEL_KEY } from './AppointmentListScreen.constants';

export function AppointmentListScreen({
  repository,
  onOpenAppointment,
  onBookAppointment,
}: AppointmentListScreenProps) {
  const theme = useTheme();
  const { query, tab, setTab, counts, visible } =
    useAppointmentList(repository);

  return (
    <ScreenContainer
      bottomInset={false}
      header={<ScreenHeader title={translate('appointments.title')} />}
    >
      <SimulationBanner />
      <SegmentedTabs
        items={APPOINTMENT_TABS.map(key => ({
          key,
          label: translate(TAB_LABEL_KEY[key]),
          count: counts[key],
        }))}
        selectedKey={tab}
        onSelect={key => setTab(key as AppointmentTab)}
      />
      <Button
        label={translate('appointments.bookNew')}
        onPress={onBookAppointment}
        fullWidth
        testID="book-appointment"
      />

      {query.status === 'loading' ? (
        <SkeletonGroup>
          <SkeletonRow leading="square" lines={3} trailing />
          <SkeletonRow leading="square" lines={3} trailing />
          <SkeletonRow leading="square" lines={3} trailing />
        </SkeletonGroup>
      ) : null}

      {query.status === 'error' ? (
        <EmptyState
          icon="triangle-alert"
          title={translate('common.loadFailedTitle')}
          description={translate('common.loadFailedBody')}
          actionLabel={translate('common.retry')}
          onAction={query.reload}
        />
      ) : null}

      {query.status === 'ready' && visible.length === 0 ? (
        <EmptyState
          icon="calendar"
          title={translate(`${EMPTY_KEY[tab]}.title`)}
          description={translate(`${EMPTY_KEY[tab]}.description`)}
          testID="appointments-empty"
        />
      ) : null}

      {query.status === 'ready' && visible.length > 0 ? (
        <View style={{ gap: theme.spacing[3] }}>
          <Typography
            variant="caption"
            tone="secondary"
            accessibilityRole="text"
          >
            {translate(TAB_LABEL_KEY[tab])} ({visible.length})
          </Typography>
          {visible.map((appointment, index) => (
            <FadeInView key={appointment.id} delay={staggerDelay(index)}>
              <AppointmentCard
                appointment={appointment}
                onPress={onOpenAppointment}
              />
            </FadeInView>
          ))}
        </View>
      ) : null}
    </ScreenContainer>
  );
}
