import type { Conversation } from '../../../domain/entities/Chat';

export type ConversationRowProps = {
  readonly conversation: Conversation;
  readonly onPress: (conversationId: string) => void;
};
