import { useCallback } from 'react';
import { View } from 'react-native';
import {
  EmptyState,
  SimulationBanner,
  SkeletonCard,
} from '@design-system/feedback';
import { ScreenHeader } from '@design-system/navigation';
import { Button } from '@design-system/primitives';
import { ScreenContainer } from '@design-system/surfaces';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import { useAsyncQuery } from '@shared/hooks';
import { isSameDay } from '@shared/utilities/localDateTime';
import type { AppNotification } from '../../../domain/entities/Notification';
import { NotificationGroup } from './components/NotificationGroup';
import type { NotificationCenterScreenProps } from './NotificationCenterScreen.types';

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
          <NotificationGroup
            title={translate('notifications.groups.today')}
            notifications={data.filter(item => isSameDay(item.createdAt, now))}
            now={now}
            onPress={handlePress}
          />
          <NotificationGroup
            title={translate('notifications.groups.earlier')}
            notifications={data.filter(item => !isSameDay(item.createdAt, now))}
            now={now}
            onPress={handlePress}
          />
        </>
      ) : null}
    </ScreenContainer>
  );
}
