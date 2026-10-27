import { Easing } from 'react-native';
import { motion } from '../../styles/tokens';
import type { MotionEasing } from '../../styles/tokens';

/** Resolves an easing token to an Animated-compatible easing function. */
export function getEasing(name: MotionEasing): (value: number) => number {
  const [x1, y1, x2, y2] = motion.easing[name];
  return Easing.bezier(x1, y1, x2, y2);
}
