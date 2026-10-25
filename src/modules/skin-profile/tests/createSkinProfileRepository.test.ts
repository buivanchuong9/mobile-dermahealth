import { createSkinProfileRepository } from '../data/repositories/createSkinProfileRepository';
import { SKIN_PROFILE_STORAGE_KEY } from '../data/mappers/skinProfileStorageMapper';
import type { SkinProfile } from '../domain/entities/SkinProfile';
import { createInMemoryStorage } from './testDoubles';

const PROFILE: SkinProfile = {
  skinType: 'combination',
  concerns: ['acne', 'dullness'],
  updatedAt: '2026-03-01T10:00:00.000Z',
};

const validDocument = (overrides: Record<string, unknown> = {}) =>
  JSON.stringify({
    schemaVersion: 1,
    skinType: 'dry',
    concerns: [],
    updatedAt: '2026-01-01T00:00:00.000Z',
    ...overrides,
  });

function setup(raw?: string) {
  const storage = createInMemoryStorage(
    raw === undefined ? {} : { [SKIN_PROFILE_STORAGE_KEY]: raw },
  );
  return { storage, repository: createSkinProfileRepository({ storage }) };
}

describe('get', () => {
  test('missing data is an empty state, not an error', async () => {
    const { repository } = setup();
    expect(await repository.get()).toEqual({ ok: true, value: null });
  });

  test('reads a valid document', async () => {
    const { repository } = setup(validDocument({ concerns: ['acne'] }));
    const result = await repository.get();
    expect(result.ok && result.value).toEqual({
      skinType: 'dry',
      concerns: ['acne'],
      updatedAt: '2026-01-01T00:00:00.000Z',
    });
  });

  test.each([
    ['broken JSON', '{"skinType": "dr'],
    ['a JSON array', '[1,2]'],
    ['a JSON string', '"oily"'],
    ['a missing version', JSON.stringify({ skinType: 'dry', concerns: [] })],
    ['a non-integer version', validDocument({ schemaVersion: 1.5 })],
    ['version zero', validDocument({ schemaVersion: 0 })],
    ['an unknown skin type', validDocument({ skinType: 'eczema' })],
    ['unknown concerns', validDocument({ concerns: ['rosacea'] })],
    ['an invalid timestamp', validDocument({ updatedAt: 'yesterday' })],
  ])('reports %s as corrupt storage', async (_name, raw) => {
    const { repository } = setup(raw);
    const result = await repository.get();
    expect(!result.ok && result.error.code).toBe('storage');
    expect(!result.ok && result.error.message).toMatch(/corrupt/);
  });

  test('reports a newer schema version without reading it', async () => {
    const { repository } = setup(validDocument({ schemaVersion: 2 }));
    const result = await repository.get();
    expect(!result.ok && result.error.message).toMatch(/newer app version/);
  });

  test('propagates read failures', async () => {
    const { repository, storage } = setup();
    storage.failNext('getItem');
    const result = await repository.get();
    expect(!result.ok && result.error.code).toBe('storage');
  });
});

describe('save', () => {
  test('writes a versioned document and reads it back', async () => {
    const { repository, storage } = setup();
    expect((await repository.save(PROFILE)).ok).toBe(true);

    expect(
      JSON.parse(storage.data.get(SKIN_PROFILE_STORAGE_KEY) ?? ''),
    ).toEqual({
      schemaVersion: 1,
      skinType: 'combination',
      concerns: ['acne', 'dullness'],
      updatedAt: '2026-03-01T10:00:00.000Z',
    });
    expect(await repository.get()).toEqual({ ok: true, value: PROFILE });
  });

  test('replaces a previously saved valid profile', async () => {
    const { repository } = setup(validDocument());
    expect((await repository.save(PROFILE)).ok).toBe(true);
    const result = await repository.get();
    expect(result.ok && result.value?.skinType).toBe('combination');
  });

  test.each([
    ['corrupt data', '{not json'],
    ['newer-version data', validDocument({ schemaVersion: 9 })],
  ])('refuses to overwrite %s', async (_name, raw) => {
    const { repository, storage } = setup(raw);
    const result = await repository.save(PROFILE);
    expect(!result.ok && result.error.code).toBe('storage');
    expect(storage.data.get(SKIN_PROFILE_STORAGE_KEY)).toBe(raw);
  });

  test('reports write failures and keeps existing data', async () => {
    const raw = validDocument();
    const { repository, storage } = setup(raw);
    storage.failNext('setItem');
    const result = await repository.save(PROFILE);
    expect(result.ok).toBe(false);
    expect(storage.data.get(SKIN_PROFILE_STORAGE_KEY)).toBe(raw);
  });

  test('does not write when the pre-save read fails', async () => {
    const { repository, storage } = setup();
    storage.failNext('getItem');
    expect((await repository.save(PROFILE)).ok).toBe(false);
    expect(storage.data.size).toBe(0);
  });
});

describe('clear', () => {
  test('removes the key, including unreadable data', async () => {
    const { repository, storage } = setup('{not json');
    expect((await repository.clear()).ok).toBe(true);
    expect(storage.data.has(SKIN_PROFILE_STORAGE_KEY)).toBe(false);
    expect(await repository.get()).toEqual({ ok: true, value: null });
  });

  test('reports removal failures', async () => {
    const { repository, storage } = setup(validDocument());
    storage.failNext('removeItem');
    expect((await repository.clear()).ok).toBe(false);
  });
});
