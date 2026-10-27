import type { ChatRepository } from '../../../model/chat/ChatRepository';

export type ConversationListScreenProps = {
  readonly repository: ChatRepository;
  readonly onOpenConversation: (conversationId: string) => void;
  readonly onBack: () => void;
};
