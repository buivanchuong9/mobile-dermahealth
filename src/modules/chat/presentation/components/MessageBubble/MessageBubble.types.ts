import type { ChatMessage } from '../../../domain/entities/Chat';

export type MessageBubbleProps = {
  readonly message: ChatMessage;
  /** Play a short entrance; set only for messages that arrive after the first load. */
  readonly animate?: boolean;
};
