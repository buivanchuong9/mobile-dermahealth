export type SkeletonRowProps = {
  /** Leading avatar or icon circle. */
  readonly leading?: 'none' | 'circle' | 'square';
  /** Text lines beside the leading shape; the last one is shorter. */
  readonly lines?: number;
  /** Small pill at the trailing edge (status badge, time). */
  readonly trailing?: boolean;
  /** Draw inside a card surface, like the real list rows. */
  readonly card?: boolean;
};
