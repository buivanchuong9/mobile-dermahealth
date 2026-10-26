import {
  EmptyState,
  SimulationBanner,
  SkeletonGroup,
  SkeletonRow,
} from '@design-system/feedback';
import { Banner } from '@design-system/feedback';
import { FadeInView, staggerDelay } from '@design-system/motion';
import { ScreenHeader } from '@design-system/navigation';
import { ScreenContainer } from '@design-system/surfaces';
import { translate } from '@shared/localization';
import { ConversationRow } from '../../components/ConversationRow';
import { useConversations } from '../../hooks/useConversations';
import type { ConversationListScreenProps } from './ConversationListScreen.types';

export function ConversationListScreen({
  repository,
  onOpenConversation,
  onBack,
}: ConversationListScreenProps) {
  const query = useConversations(repository);
  return (
    <ScreenContainer
      header={<ScreenHeader title={translate('chat.title')} onBack={onBack} />}
    >
      <SimulationBanner />
      <Banner tone="warning" message={translate('chat.simulatedBanner')} />
      {query.status === 'loading' ? (
        <SkeletonGroup>
          <SkeletonRow leading="circle" lines={2} trailing />
          <SkeletonRow leading="circle" lines={2} trailing />
          <SkeletonRow leading="circle" lines={2} trailing />
          <SkeletonRow leading="circle" lines={2} trailing />
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
      {query.status === 'ready' && query.data.length === 0 ? (
        <EmptyState
          icon="message-circle"
          title={translate('chat.empty.list.title')}
          description={translate('chat.empty.list.description')}
        />
      ) : null}
      {query.status === 'ready'
        ? query.data.map((conversation, index) => (
            <FadeInView key={conversation.id} delay={staggerDelay(index)}>
              <ConversationRow
                conversation={conversation}
                onPress={onOpenConversation}
              />
            </FadeInView>
          ))
        : null}
    </ScreenContainer>
  );
}
