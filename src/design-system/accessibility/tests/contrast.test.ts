import { contrastRatio } from '../contrast';

test('black on white is 21:1 and symmetric', () => {
  expect(contrastRatio('#000000', '#FFFFFF')).toBeCloseTo(21, 5);
  expect(contrastRatio('#FFFFFF', '#000000')).toBeCloseTo(21, 5);
});

test('identical colors are 1:1', () => {
  expect(contrastRatio('#2563EB', '#2563EB')).toBeCloseTo(1, 5);
});

test('rejects unsupported color formats', () => {
  expect(() => contrastRatio('red', '#FFFFFF')).toThrow();
});
