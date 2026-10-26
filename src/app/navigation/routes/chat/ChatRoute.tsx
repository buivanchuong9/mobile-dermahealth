import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChatScreen } from '@modules/chat';
import { useAppServices } from '../../../providers/AppServicesProvider';
import type { RootStackParamList } from '../../navigation.types';
import { useRootNavigation } from '../../hooks/useRootNavigation';

export function ChatRoute({
  route,
}: NativeStackScreenProps<RootStackParamList, 'Chat'>) {
  const navigation = useRootNavigation();
  const services = useAppServices();
  return (
    <ChatScreen
      repository={services.chat}
      conversationId={route.params.conversationId}
      onBack={navigation.goBack}
    />
  );
}
