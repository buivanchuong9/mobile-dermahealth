import { createLogger } from '@core/logging';
import type { LogEntry } from '@core/contracts';
import { createSkinProfileRepository } from '../data/repositories/createSkinProfileRepository';
import { SKIN_PROFILE_STORAGE_KEY } from '../data/mappers/skinProfileStorageMapper';
import { createInMemoryStorage } from './testDoubles';

const SENSITIVE_VALUES = ['oily', 'acne', 'dullness', 'rosacea'];

function setup(raw: string) {
  const entries: LogEntry[] = [];
  const logger = createLogger({
    sink: { write: entry => entries.push(entry) },
    minLevel: 'debug',
  });
  const storage = createInMemoryStorage({ [SKIN_PROFILE_STORAGE_KEY]: raw });
  return {
    entries,
    storage,
    repository: createSkinProfileRepository({ storage, logger }),
  };
}

const expectNoProfileData = (entries: readonly LogEntry[]) => {
  const output = JSON.stringify(entries);
  for (const value of SENSITIVE_VALUES) {
    expect(output).not.toContain(value);
  }
};

test('logs and errors for corrupt data never contain profile values', async () => {
  const { repository, entries } = setup(
    '{"schemaVersion":1,"skinType":"oily","concerns":["acne","rosacea"],"updatedAt":',
  );
  const result = await repository.get();

  expect(entries.length).toBeGreaterThan(0);
  expectNoProfileData(entries);
  expect(JSON.stringify(result)).not.toMatch(/oily|acne|rosacea/);
});

test('logs for a failed save never contain profile values', async () => {
  const { repository, entries, storage } = setup(
    JSON.stringify({
      schemaVersion: 1,
      skinType: 'dry',
      concerns: [],
      updatedAt: '2026-01-01T00:00:00.000Z',
    }),
  );
  storage.failNext('setItem');
  storage.failNext('getItem');
  await repository.save({
    skinType: 'oily',
    concerns: ['acne', 'dullness'],
    updatedAt: '2026-03-01T10:00:00.000Z',
  });
  await repository.get();

  expectNoProfileData(entries);
});

test('even if a caller logs profile fields, the shared logger redacts them', () => {
  const entries: LogEntry[] = [];
  const logger = createLogger({
    sink: { write: entry => entries.push(entry) },
  });
  logger.info('profile saved', { skinType: 'oily', concerns: ['acne'] });
  expectNoProfileData(entries);
});
