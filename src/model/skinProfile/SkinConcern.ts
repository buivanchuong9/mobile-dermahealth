/**
 * General skincare concern from a closed list. These are everyday categories,
 * not medical conditions or diagnoses.
 */
export const SKIN_CONCERNS = [
  'acne',
  'dryness',
  'oiliness',
  'sensitivity',
  'dark_spots',
  'fine_lines',
  'large_pores',
  'dullness',
] as const;

export type SkinConcern = (typeof SKIN_CONCERNS)[number];

export function isSkinConcern(value: unknown): value is SkinConcern {
  return SKIN_CONCERNS.some(concern => concern === value);
}
