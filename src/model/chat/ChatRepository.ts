import type { AppError, Result } from '@model/common';
import type { ChatMessage, Conversation } from './Chat';

export interface ChatRepository {
  listConversations(): Promise<Result<readonly Conversation[], AppError>>;
  getConversation(id: string): Promise<Result<Conversation, AppError>>;
  getMessages(
    conversationId: string,
  ): Promise<Result<readonly ChatMessage[], AppError>>;
  /** Resolves once the message is stored locally; delivery is simulated after. */
  sendMessage(
    conversationId: string,
    text: string,
  ): Promise<Result<ChatMessage, AppError>>;
  markRead(conversationId: string): Promise<Result<void, AppError>>;
  subscribe(listener: () => void): () => void;
}
