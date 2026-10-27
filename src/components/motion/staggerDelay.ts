import { motion } from '../../styles/tokens';

/**
 * Start delay for item `index` of a group. Items after `stagger.maxItems`
 * share the last delay so long lists never wait noticeably.
 */
export function staggerDelay(index: number): number {
  return (
    Math.min(Math.max(index, 0), motion.stagger.maxItems) * motion.stagger.step
  );
}
