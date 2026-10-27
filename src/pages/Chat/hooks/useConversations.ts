import { useCallback } from 'react';
import { useAsyncQuery } from '@hooks';
import type { ChatRepository } from '../../../model/chat/ChatRepository';

export function useConversations(repository: ChatRepository) {
  const load = useCallback(() => repository.listConversations(), [repository]);
  return useAsyncQuery(load, repository.subscribe);
}
