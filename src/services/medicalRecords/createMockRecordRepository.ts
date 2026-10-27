import { createAppError, err, ok } from '@model/common';
import type { Clock } from '@model/common';
import type { RecordRepository } from '../../model/medicalRecords/RecordRepository';
import { createSeedRecords } from '../../mocks/medicalRecords/records.mock';

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
