import type { ChatRepository } from '../../../model/chat/ChatRepository';

export type ChatScreenProps = {
  readonly repository: ChatRepository;
  readonly conversationId: string;
  readonly onBack: () => void;
};
