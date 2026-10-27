const UNIT = 4;

/** Spacing scale in multiples of 4. Keys are the multiplier. */
export const spacing = {
  0: 0,
  1: UNIT,
  2: UNIT * 2,
  3: UNIT * 3,
  4: UNIT * 4,
  5: UNIT * 5,
  6: UNIT * 6,
  8: UNIT * 8,
  10: UNIT * 10,
  12: UNIT * 12,
} as const;

export type Spacing = typeof spacing;
