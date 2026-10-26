import { ConversationListScreen } from '@modules/chat';
import { useAppServices } from '../../../providers/AppServicesProvider';
import { useRootNavigation } from '../../hooks/useRootNavigation';

export function ConversationListRoute() {
  const navigation = useRootNavigation();
  const services = useAppServices();
  return (
    <ConversationListScreen
      repository={services.chat}
      onOpenConversation={conversationId =>
        navigation.navigate('Chat', { conversationId })
      }
      onBack={navigation.goBack}
    />
  );
}
