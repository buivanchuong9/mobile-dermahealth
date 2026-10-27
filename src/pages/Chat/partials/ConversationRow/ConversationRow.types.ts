import type { Conversation } from '../../../../model/chat/Chat';

export type ConversationRowProps = {
  readonly conversation: Conversation;
  readonly onPress: (conversationId: string) => void;
};
