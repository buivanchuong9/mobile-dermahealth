import { useCallback, useEffect, useState } from 'react';
import { useAsyncQuery } from '@shared/hooks';
import type { ChatRepository } from '../../domain/repositories/ChatRepository';

export function useChat(repository: ChatRepository, conversationId: string) {
  const loadMessages = useCallback(
    () => repository.getMessages(conversationId),
    [repository, conversationId],
  );
  const loadConversation = useCallback(
    () => repository.getConversation(conversationId),
    [repository, conversationId],
  );
  const messages = useAsyncQuery(loadMessages, repository.subscribe);
  const conversation = useAsyncQuery(loadConversation, repository.subscribe);
  const [draft, setDraft] = useState('');
  const [sendFailed, setSendFailed] = useState(false);

  useEffect(() => {
    repository.markRead(conversationId);
  }, [repository, conversationId]);

  const send = useCallback(
    async (text: string) => {
      setSendFailed(false);
      const result = await repository.sendMessage(conversationId, text);
      if (result.ok) {
        setDraft('');
      } else {
        setSendFailed(true);
      }
    },
    [repository, conversationId],
  );

  return { messages, conversation, draft, setDraft, send, sendFailed };
}
