import { Easing } from 'react-native';
import { motion } from '../tokens';
import type { MotionEasing } from '../tokens';

/** Resolves an easing token to an Animated-compatible easing function. */
export function getEasing(name: MotionEasing): (value: number) => number {
  const [x1, y1, x2, y2] = motion.easing[name];
  return Easing.bezier(x1, y1, x2, y2);
}
