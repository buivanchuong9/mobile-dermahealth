import type { LocalDateTime } from '@utils/localDateTime';

/** `doctor_simulated` marks every doctor-side message as not from a real clinician. */
export type MessageSender = 'patient' | 'doctor_simulated';

/** Delivery state in the simulation; never implies a doctor has read it. */
export type MessageStatus = 'sending' | 'sent';

export type ChatMessage = {
  readonly id: string;
  readonly conversationId: string;
  readonly sender: MessageSender;
  readonly text: string;
  readonly sentAt: LocalDateTime;
  readonly status: MessageStatus;
};

export type Conversation = {
  readonly id: string;
  readonly doctorName: string;
  readonly doctorTitle: string;
  readonly context: string;
  readonly lastMessagePreview: string | null;
  readonly lastMessageAt: LocalDateTime | null;
  readonly unreadCount: number;
  /** True while the simulated automatic reply is being prepared. */
  readonly replyPending: boolean;
};
