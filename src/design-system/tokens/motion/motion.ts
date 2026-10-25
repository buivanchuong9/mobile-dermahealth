export const motion = {
  duration: { instant: 0, fast: 120, normal: 200, slow: 320 },
} as const;

export type Motion = typeof motion;
