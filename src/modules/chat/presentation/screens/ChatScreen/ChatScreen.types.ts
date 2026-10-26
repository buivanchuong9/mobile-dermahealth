import type { ChatRepository } from '../../../domain/repositories/ChatRepository';

export type ChatScreenProps = {
  readonly repository: ChatRepository;
  readonly conversationId: string;
  readonly onBack: () => void;
};
