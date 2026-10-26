import { useCallback } from 'react';
import { useAsyncQuery } from '@shared/hooks';
import type { RecordRepository } from '../../../../domain/repositories/RecordRepository';

export function useRecordEntry(repository: RecordRepository, recordId: string) {
  const load = useCallback(
    () => repository.get(recordId),
    [repository, recordId],
  );
  return useAsyncQuery(load);
}
