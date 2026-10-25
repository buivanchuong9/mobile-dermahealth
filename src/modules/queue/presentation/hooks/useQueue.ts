import { useCallback, useEffect, useState } from 'react';
import { useAsyncQuery } from '@shared/hooks';
import type { QueueRepository } from '../../domain/repositories/QueueRepository';

const AUTO_STEP_MS = 4000;

export function useQueue(repository: QueueRepository) {
  const load = useCallback(() => repository.getSnapshot(), [repository]);
  const query = useAsyncQuery(load, repository.subscribe);
  const [autoRunning, setAutoRunning] = useState(false);

  const snapshot = query.status === 'ready' ? query.data : null;
  const hasTicket = snapshot !== null;
  const finished = snapshot?.stage === 'completed';

  useEffect(() => {
    if (!autoRunning || finished || !hasTicket) {
      return undefined;
    }
    const timer = setInterval(() => {
      repository.advance();
    }, AUTO_STEP_MS);
    return () => clearInterval(timer);
  }, [autoRunning, finished, hasTicket, repository]);

  useEffect(() => {
    if (finished) {
      setAutoRunning(false);
    }
  }, [finished]);

  return {
    query,
    snapshot,
    autoRunning,
    toggleAuto: () => setAutoRunning(current => !current),
    advance: () => repository.advance(),
    reset: async () => {
      setAutoRunning(false);
      await repository.reset();
    },
  };
}
