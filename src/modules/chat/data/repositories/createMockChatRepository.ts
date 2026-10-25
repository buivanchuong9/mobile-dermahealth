import { createAppError, err, ok } from '@core/contracts';
import type { Clock } from '@core/contracts';
import { translate } from '@shared/localization';
import type { ChatMessage, Conversation } from '../../domain/entities/Chat';
import type { ChatRepository } from '../../domain/repositories/ChatRepository';

const SENT_DELAY_MS = 600;
const REPLY_DELAY_MS = 1600;

type ConversationState = Conversation;

/**
 * In-memory simulation. Replies are canned and automatic; nothing is sent to a
 * clinician and nothing leaves the device.
 */
export function createMockChatRepository(clock: Clock): ChatRepository {
  let sequence = 1;
  const listeners = new Set<() => void>();
  const notify = () => listeners.forEach(listener => listener());

  let conversations: ConversationState[] = [
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

  let messages: ChatMessage[] = [
    {
      id: 'msg-seed-1',
      conversationId: 'conv-lan',
      sender: 'doctor_simulated',
      text: translate('chat.sampleOpening'),
      sentAt: clock.now(),
      status: 'sent',
    },
  ];

  const updateConversation = (
    id: string,
    patch: Partial<ConversationState>,
  ) => {
    conversations = conversations.map(item =>
      item.id === id ? { ...item, ...patch } : item,
    );
  };

  const append = (message: ChatMessage) => {
    messages = [...messages, message];
    updateConversation(message.conversationId, {
      lastMessagePreview: message.text,
      lastMessageAt: message.sentAt,
    });
  };

  const setStatus = (id: string, status: ChatMessage['status']) => {
    messages = messages.map(item =>
      item.id === id ? { ...item, status } : item,
    );
  };

  return {
    async listConversations() {
      return ok(conversations);
    },

    async getConversation(id) {
      const found = conversations.find(item => item.id === id);
      return found
        ? ok(found)
        : err(createAppError('not_found', 'Conversation not found'));
    },

    async getMessages(conversationId) {
      return ok(
        messages.filter(item => item.conversationId === conversationId),
      );
    },

    async sendMessage(conversationId, text) {
      const trimmed = text.trim();
      if (trimmed === '') {
        return err(createAppError('validation', 'Message is empty'));
      }
      if (!conversations.some(item => item.id === conversationId)) {
        return err(createAppError('not_found', 'Conversation not found'));
      }
      const message: ChatMessage = {
        id: `msg-${sequence++}`,
        conversationId,
        sender: 'patient',
        text: trimmed,
        sentAt: clock.now(),
        status: 'sending',
      };
      append(message);
      updateConversation(conversationId, { replyPending: true });
      notify();

      setTimeout(() => {
        setStatus(message.id, 'sent');
        notify();
      }, SENT_DELAY_MS);

      setTimeout(() => {
        append({
          id: `msg-${sequence++}`,
          conversationId,
          sender: 'doctor_simulated',
          text: translate('chat.autoReply'),
          sentAt: clock.now(),
          status: 'sent',
        });
        updateConversation(conversationId, { replyPending: false });
        notify();
      }, REPLY_DELAY_MS);

      return ok(message);
    },

    async markRead(conversationId) {
      updateConversation(conversationId, { unreadCount: 0 });
      notify();
      return ok(undefined);
    },

    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}
