import type { ChatRepository } from '../../../domain/repositories/ChatRepository';

export type ConversationListScreenProps = {
  readonly repository: ChatRepository;
  readonly onOpenConversation: (conversationId: string) => void;
  readonly onBack: () => void;
};
