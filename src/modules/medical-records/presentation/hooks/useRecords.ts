import { useCallback, useMemo, useState } from 'react';
import { useAsyncQuery } from '@shared/hooks';
import type { RecordFilter } from '../../domain/entities/RecordEntry';
import type { RecordRepository } from '../../domain/repositories/RecordRepository';
import { filterRecords } from '../../domain/rules/recordRules';

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
