import type { ChatMessage } from '../../../../model/chat/Chat';

export type MessageBubbleProps = {
  readonly message: ChatMessage;
  /** Play a short entrance; set only for messages that arrive after the first load. */
  readonly animate?: boolean;
};
