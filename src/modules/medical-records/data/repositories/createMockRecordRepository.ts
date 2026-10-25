import { createAppError, err, ok } from '@core/contracts';
import type { Clock } from '@core/contracts';
import type { RecordRepository } from '../../domain/repositories/RecordRepository';
import { createSeedRecords } from '../mock/records.mock';

export function createMockRecordRepository(clock: Clock): RecordRepository {
  const entries = createSeedRecords(clock.now());
  return {
    async list() {
      return ok(entries);
    },
    async get(id) {
      const found = entries.find(entry => entry.id === id);
      return found
        ? ok(found)
        : err(createAppError('not_found', 'Record not found'));
    },
  };
}
