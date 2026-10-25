import { createAppError, err, ok } from '@core/contracts';
import { createSkinProfileUseCases } from '../application/use-cases/createSkinProfileUseCases';
import type { SkinProfile } from '../domain/entities/SkinProfile';
import { createFakeRepository } from './testDoubles';

const NOW = new Date('2026-03-01T10:00:00.000Z');
const PROFILE: SkinProfile = {
  skinType: 'dry',
  concerns: ['acne'],
  updatedAt: '2026-01-01T00:00:00.000Z',
};

test('load returns what the repository returns', async () => {
  const useCases = createSkinProfileUseCases({
    repository: createFakeRepository({ get: async () => ok(PROFILE) }),
  });
  expect(await useCases.load()).toEqual(ok(PROFILE));
});

test('load surfaces repository failures unchanged', async () => {
  const failure = err(createAppError('storage', 'broken'));
  const useCases = createSkinProfileUseCases({
    repository: createFakeRepository({ get: async () => failure }),
  });
  expect(await useCases.load()).toBe(failure);
});

test('save validates, stamps the time and persists', async () => {
  const save = jest.fn(async () => ok(undefined));
  const useCases = createSkinProfileUseCases({
    repository: createFakeRepository({ save }),
    now: () => NOW,
  });

  const result = await useCases.save({ skinType: 'oily', concerns: ['acne'] });

  expect(result).toEqual(
    ok({
      skinType: 'oily',
      concerns: ['acne'],
      updatedAt: '2026-03-01T10:00:00.000Z',
    }),
  );
  expect(save).toHaveBeenCalledTimes(1);
});

test('save rejects an invalid draft without touching the repository', async () => {
  const save = jest.fn(async () => ok(undefined));
  const useCases = createSkinProfileUseCases({
    repository: createFakeRepository({ save }),
  });

  const result = await useCases.save({ skinType: null, concerns: [] });

  expect(!result.ok && result.error.code).toBe('validation');
  expect(save).not.toHaveBeenCalled();
});

test('save returns the repository error when persisting fails', async () => {
  const failure = err(createAppError('storage', 'disk full'));
  const useCases = createSkinProfileUseCases({
    repository: createFakeRepository({ save: async () => failure }),
  });
  const result = await useCases.save({ skinType: 'dry', concerns: [] });
  expect(result).toBe(failure);
});

test('remove delegates to the repository', async () => {
  const clear = jest.fn(async () => ok(undefined));
  const useCases = createSkinProfileUseCases({
    repository: createFakeRepository({ clear }),
  });
  expect((await useCases.remove()).ok).toBe(true);
  expect(clear).toHaveBeenCalledTimes(1);
});
