import {
  createAsyncStorageKeyValueStorage,
  type AsyncStorageClient,
} from '../AsyncStorageKeyValueStorage';

function createClient(overrides: Partial<AsyncStorageClient> = {}) {
  const data = new Map<string, string>();
  const client: AsyncStorageClient = {
    getItem: async key => data.get(key) ?? null,
    setItem: async (key, value) => {
      data.set(key, value);
    },
    removeItem: async key => {
      data.delete(key);
    },
    ...overrides,
  };
  return { client, data };
}

test('maps get, set and remove to Result values', async () => {
  const { client } = createClient();
  const storage = createAsyncStorageKeyValueStorage(client);

  expect(await storage.getItem('k')).toEqual({ ok: true, value: null });
  expect((await storage.setItem('k', 'v')).ok).toBe(true);
  expect(await storage.getItem('k')).toEqual({ ok: true, value: 'v' });
  expect((await storage.removeItem('k')).ok).toBe(true);
  expect(await storage.getItem('k')).toEqual({ ok: true, value: null });
});

test.each(['getItem', 'setItem', 'removeItem'] as const)(
  'turns a thrown %s into a storage AppError without leaking the value',
  async operation => {
    const failure = new Error('native failure');
    const { client } = createClient({
      [operation]: async () => {
        throw failure;
      },
    });
    const storage = createAsyncStorageKeyValueStorage(client);

    const result =
      operation === 'setItem'
        ? await storage.setItem('key', 'secret-value')
        : await storage[operation]('key');

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe('storage');
      expect(result.error.cause).toBe(failure);
      expect(result.error.message).not.toMatch(/secret-value|key/);
    }
  },
);
