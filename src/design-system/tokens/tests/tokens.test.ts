import { palette, radius, spacing, typography } from '..';

test('spacing values are multiples of 4', () => {
  for (const value of Object.values(spacing)) {
    expect(value % 4).toBe(0);
  }
});

test('line height is never smaller than font size', () => {
  for (const token of Object.values(typography)) {
    expect(token.lineHeight).toBeGreaterThanOrEqual(token.fontSize);
  }
});

test('radius scale is ascending', () => {
  const values = Object.values(radius);
  expect([...values].sort((a, b) => a - b)).toEqual(values);
});

test('palette keeps the agreed brand colors', () => {
  expect(palette.blue600).toBe('#2563EB');
  expect(palette.navy900).toBe('#172B4D');
});
