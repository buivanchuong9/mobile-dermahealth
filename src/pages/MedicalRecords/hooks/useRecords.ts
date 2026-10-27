import { useCallback, useMemo, useState } from 'react';
import { useAsyncQuery } from '@hooks';
import type { RecordFilter } from '../../../model/medicalRecords/RecordEntry';
import type { RecordRepository } from '../../../model/medicalRecords/RecordRepository';
import { filterRecords } from '../../../utils/medicalRecords/recordRules';

export function useRecords(repository: RecordRepository) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<RecordFilter>('all');
  const load = useCallback(() => repository.list(), [repository]);
  const records = useAsyncQuery(load);

  const visible = useMemo(
    () =>
      records.status === 'ready'
        ? filterRecords(records.data, { query, filter })
        : [],
    [records, query, filter],
  );

  return { records, query, setQuery, filter, setFilter, visible };
}
