import { useCallback } from 'react';
import { useAsyncQuery } from '@shared/hooks';
import type { ChatRepository } from '../../domain/repositories/ChatRepository';

export function useConversations(repository: ChatRepository) {
  const load = useCallback(() => repository.listConversations(), [repository]);
  return useAsyncQuery(load, repository.subscribe);
}
