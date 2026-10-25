import {
  createSkinProfile,
  restoreSkinProfile,
  validateSkinProfileAnswers,
} from '../domain/rules/skinProfileRules';

const NOW = new Date('2026-03-01T10:00:00.000Z');

describe('validateSkinProfileAnswers', () => {
  test('accepts a valid skin type with no concerns', () => {
    const result = validateSkinProfileAnswers({
      skinType: 'dry',
      concerns: [],
    });
    expect(result).toEqual({
      ok: true,
      value: { skinType: 'dry', concerns: [] },
    });
  });

  test('orders concerns canonically', () => {
    const result = validateSkinProfileAnswers({
      skinType: 'oily',
      concerns: ['dullness', 'acne'],
    });
    expect(result.ok && result.value.concerns).toEqual(['acne', 'dullness']);
  });

  test.each([null, undefined])('requires a skin type (%s)', skinType => {
    const result = validateSkinProfileAnswers({ skinType, concerns: [] });
    expect(!result.ok && result.error).toEqual([
      { field: 'skinType', reason: 'required' },
    ]);
  });

  test.each(['eczema', 42, {}, ''])(
    'rejects invalid skin type %p',
    skinType => {
      const result = validateSkinProfileAnswers({ skinType, concerns: [] });
      expect(!result.ok && result.error).toEqual([
        { field: 'skinType', reason: 'invalid' },
      ]);
    },
  );

  test('rejects unknown concerns such as medical conditions', () => {
    const result = validateSkinProfileAnswers({
      skinType: 'dry',
      concerns: ['rosacea'],
    });
    expect(!result.ok && result.error).toEqual([
      { field: 'concerns', reason: 'invalid' },
    ]);
  });

  test('rejects duplicate concerns', () => {
    const result = validateSkinProfileAnswers({
      skinType: 'dry',
      concerns: ['acne', 'acne'],
    });
    expect(!result.ok && result.error).toEqual([
      { field: 'concerns', reason: 'duplicate' },
    ]);
  });

  test('rejects concerns that are not a list', () => {
    const result = validateSkinProfileAnswers({
      skinType: 'dry',
      concerns: 'acne',
    });
    expect(!result.ok && result.error).toEqual([
      { field: 'concerns', reason: 'invalid' },
    ]);
  });

  test('reports every problem at once', () => {
    const result = validateSkinProfileAnswers({ skinType: null, concerns: 1 });
    expect(!result.ok && result.error).toHaveLength(2);
  });
});

describe('createSkinProfile', () => {
  test('stamps the injected time', () => {
    const result = createSkinProfile({ skinType: 'normal', concerns: [] }, NOW);
    expect(result).toEqual({
      ok: true,
      value: {
        skinType: 'normal',
        concerns: [],
        updatedAt: '2026-03-01T10:00:00.000Z',
      },
    });
  });

  test('fails for an incomplete draft', () => {
    expect(createSkinProfile({ skinType: null, concerns: [] }, NOW).ok).toBe(
      false,
    );
  });
});

describe('restoreSkinProfile', () => {
  test('keeps the stored timestamp', () => {
    const result = restoreSkinProfile({
      skinType: 'dry',
      concerns: ['acne'],
      updatedAt: '2026-01-02T03:04:05.000Z',
    });
    expect(result.ok && result.value.updatedAt).toBe(
      '2026-01-02T03:04:05.000Z',
    );
  });

  test.each([undefined, 'not a date', 123])(
    'rejects invalid timestamp %p',
    updatedAt => {
      const result = restoreSkinProfile({
        skinType: 'dry',
        concerns: [],
        updatedAt,
      });
      expect(!result.ok && result.error).toContainEqual({
        field: 'updatedAt',
        reason: 'invalid',
      });
    },
  );
});
