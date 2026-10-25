import { View } from 'react-native';
import { SegmentedTabs } from '@design-system/navigation';
import { ScreenHeader } from '@design-system/navigation';
import { ScreenContainer } from '@design-system/surfaces';
import { Button, Typography } from '@design-system/primitives';
import {
  EmptyState,
  SimulationBanner,
  SkeletonCard,
} from '@design-system/feedback';
import { FadeInView } from '@design-system/motion';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import type { AppointmentRepository } from '../../../domain/repositories/AppointmentRepository';
import type { AppointmentTab } from '../../../domain/rules/appointmentRules';
import { AppointmentCard } from '../../components/AppointmentCard';
import {
  APPOINTMENT_TABS,
  useAppointmentList,
} from '../../hooks/useAppointmentList';

export type AppointmentListScreenProps = {
  readonly repository: AppointmentRepository;
  readonly onOpenAppointment: (appointmentId: string) => void;
  readonly onBookAppointment: () => void;
};

const TAB_LABEL_KEY = {
  upcoming: 'appointments.tabs.upcoming',
  past: 'appointments.tabs.past',
  follow_up: 'appointments.tabs.followUp',
} as const;

const EMPTY_KEY = {
  upcoming: 'appointments.empty.upcoming',
  past: 'appointments.empty.past',
  follow_up: 'appointments.empty.followUp',
} as const;

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
        <View style={{ gap: theme.spacing[3] }}>
          <SkeletonCard />
          <SkeletonCard />
        </View>
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
            <FadeInView key={appointment.id} delay={index * 60}>
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
