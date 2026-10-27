import { useCallback } from 'react';
import { useAsyncQuery } from '@hooks';
import type { RecordRepository } from '../../../../model/medicalRecords/RecordRepository';

export function useRecordEntry(repository: RecordRepository, recordId: string) {
  const load = useCallback(
    () => repository.get(recordId),
    [repository, recordId],
  );
  return useAsyncQuery(load);
}
