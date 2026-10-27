import type { Clock } from '@model/common';
import { translate } from '@i18n';
import type { ChatMessage, Conversation } from '../../model/chat/Chat';

/** Fictional conversations: one with a sample message, one still empty. */
export function createSeedConversations(clock: Clock): Conversation[] {
  return [
    {
      id: 'conv-lan',
      doctorName: 'BS. Trần Thu Lan',
      doctorTitle: 'Bác sĩ da liễu tổng quát',
      context: translate('chat.contexts.afterVisit'),
      lastMessagePreview: translate('chat.sampleOpening'),
      lastMessageAt: clock.now(),
      unreadCount: 1,
      replyPending: false,
    },
    {
      id: 'conv-minh',
      doctorName: 'BS. Nguyễn Hoàng Minh',
      doctorTitle: 'Bác sĩ điều trị mụn và sẹo',
      context: translate('chat.contexts.acneReview'),
      lastMessagePreview: null,
      lastMessageAt: null,
      unreadCount: 0,
      replyPending: false,
    },
  ];
}

export function createSeedMessages(clock: Clock): ChatMessage[] {
  return [
    {
      id: 'msg-seed-1',
      conversationId: 'conv-lan',
      sender: 'doctor_simulated',
      text: translate('chat.sampleOpening'),
      sentAt: clock.now(),
      status: 'sent',
    },
  ];
}
