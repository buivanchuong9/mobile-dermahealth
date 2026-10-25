/** Self-reported skin type from a closed list. `unsure` is a valid answer. */
export const SKIN_TYPES = [
  'normal',
  'dry',
  'oily',
  'combination',
  'sensitive',
  'unsure',
] as const;

export type SkinType = (typeof SKIN_TYPES)[number];

export function isSkinType(value: unknown): value is SkinType {
  return SKIN_TYPES.some(skinType => skinType === value);
}
