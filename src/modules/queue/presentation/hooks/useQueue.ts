import { useCallback, useEffect, useState } from 'react';
import { useAsyncQuery } from '@shared/hooks';
import type { QueueRepository } from '../../domain/repositories/QueueRepository';

const DEFAULT_AUTO_STEP_MS = 4000;

export function useQueue(
  repository: QueueRepository,
  autoStepMs: number = DEFAULT_AUTO_STEP_MS,
) {
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
    }, autoStepMs);
    return () => clearInterval(timer);
  }, [autoRunning, autoStepMs, finished, hasTicket, repository]);

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
