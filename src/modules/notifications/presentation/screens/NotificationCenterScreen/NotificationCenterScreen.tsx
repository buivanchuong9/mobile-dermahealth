import { useCallback } from 'react';
import { View } from 'react-native';
import type { Clock } from '@core/contracts';
import {
  EmptyState,
  SimulationBanner,
  SkeletonCard,
} from '@design-system/feedback';
import { FadeInView } from '@design-system/motion';
import { ScreenHeader } from '@design-system/navigation';
import { Button, Typography } from '@design-system/primitives';
import { ScreenContainer } from '@design-system/surfaces';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import { useAsyncQuery } from '@shared/hooks';
import { isSameDay } from '@shared/utilities/localDateTime';
import type { AppNotification } from '../../../domain/entities/Notification';
import type { NotificationRepository } from '../../../domain/repositories/NotificationRepository';
import { NotificationItem } from '../../components/NotificationItem';

export type NotificationCenterScreenProps = {
  readonly repository: NotificationRepository;
  readonly clock: Clock;
  readonly onBack: () => void;
  readonly onOpenPreferences: () => void;
  /** Lets the app route to the screen a notification refers to. */
  readonly onOpenNotification: (notification: AppNotification) => void;
};

export function NotificationCenterScreen({
  repository,
  clock,
  onBack,
  onOpenPreferences,
  onOpenNotification,
}: NotificationCenterScreenProps) {
  const theme = useTheme();
  const load = useCallback(() => repository.list(), [repository]);
  const query = useAsyncQuery(load, repository.subscribe);
  const now = clock.now();

  const header = (
    <ScreenHeader
      title={translate('notifications.title')}
      onBack={onBack}
      right={
        <Button
          label={translate('notifications.preferences.title')}
          accessibilityLabel={translate('notifications.preferences.title')}
          variant="ghost"
          size="sm"
          onPress={onOpenPreferences}
          testID="notifications-preferences"
        />
      }
    />
  );

  const handlePress = (notification: AppNotification) => {
    repository.markRead(notification.id);
    onOpenNotification(notification);
  };

  const renderGroup = (title: string, items: readonly AppNotification[]) =>
    items.length === 0 ? null : (
      <View key={title} style={{ gap: theme.spacing[2] }}>
        <Typography
          variant="caption"
          tone="secondary"
          accessibilityRole="header"
        >
          {title}
        </Typography>
        {items.map((notification, index) => (
          <FadeInView key={notification.id} delay={index * 50}>
            <NotificationItem
              notification={notification}
              now={now}
              onPress={handlePress}
            />
          </FadeInView>
        ))}
      </View>
    );

  const data = query.status === 'ready' ? query.data : [];
  const unreadCount = data.filter(item => !item.read).length;

  return (
    <ScreenContainer header={header}>
      <SimulationBanner />
      {query.status === 'loading' ? (
        <View style={{ gap: theme.spacing[3] }}>
          <SkeletonCard lines={2} />
          <SkeletonCard lines={2} />
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
      {query.status === 'ready' && data.length === 0 ? (
        <EmptyState
          icon="bell"
          title={translate('notifications.empty.title')}
          description={translate('notifications.empty.description')}
          testID="notifications-empty"
        />
      ) : null}
      {query.status === 'ready' && data.length > 0 ? (
        <>
          {unreadCount > 0 ? (
            <Button
              label={translate('notifications.markAllRead')}
              variant="secondary"
              size="sm"
              onPress={() => repository.markAllRead()}
              testID="notifications-mark-all"
            />
          ) : null}
          {renderGroup(
            translate('notifications.groups.today'),
            data.filter(item => isSameDay(item.createdAt, now)),
          )}
          {renderGroup(
            translate('notifications.groups.earlier'),
            data.filter(item => !isSameDay(item.createdAt, now)),
          )}
        </>
      ) : null}
    </ScreenContainer>
  );
}
