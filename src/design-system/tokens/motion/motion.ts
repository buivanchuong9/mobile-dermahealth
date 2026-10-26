/**
 * Motion tokens. Durations are in milliseconds; easing curves are cubic
 * Bézier control points `[x1, y1, x2, y2]`; springs use React Native's
 * `Animated.spring` parameters (damping below critical gives a tiny settle,
 * never a visible bounce).
 */
export const motion = {
  duration: {
    instant: 0,
    /** Press and selection feedback. */
    fast: 120,
    /** Content entering or changing inside a screen. */
    normal: 200,
    /** Larger elements and success states. */
    slow: 320,
    /** Whole-workflow transitions such as a step change. */
    emphasized: 420,
  },
  easing: {
    /** Elements moving between two on-screen positions. */
    standard: [0.2, 0, 0, 1],
    /** Elements arriving: start fast, settle gently. */
    enter: [0.05, 0.7, 0.1, 1],
    /** Elements leaving: start slowly, finish quickly. */
    exit: [0.3, 0, 0.8, 0.15],
  },
  spring: {
    /** Press feedback: crisp with a barely perceptible settle. */
    press: { stiffness: 420, damping: 30, mass: 1 },
    /** Selection indicators and sliding highlights. */
    selection: { stiffness: 320, damping: 28, mass: 1 },
  },
  stagger: {
    /** Delay between consecutive items of one group. */
    step: 50,
    /** Items past this index appear together, so long lists never lag. */
    maxItems: 6,
  },
  entrance: {
    /** Distance an entering element travels, in dp. */
    distance: 8,
    /** Starting scale of elements that scale in. */
    scaleFrom: 0.94,
  },
  press: {
    scale: 0.97,
    opacity: 0.85,
  },
  skeleton: {
    /** One half-cycle of the shared loading pulse. */
    pulseDuration: 900,
    lowOpacity: 0.55,
  },
} as const;

export type Motion = typeof motion;
export type MotionDuration = keyof Motion['duration'];
export type MotionEasing = keyof Motion['easing'];
