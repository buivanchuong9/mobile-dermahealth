import { Vibration } from 'react-native';
import type { AlertKind, AlertPlayer } from '@model/common';

const PATTERNS: Record<AlertKind, number[]> = {
  upcoming_turn: [0, 200],
  turn_called: [0, 300, 150, 300],
};

/**
 * Device alert cue using the system vibration motor.
 *
 * Limitations: no audio is produced (no sound library is installed), and the
 * OS may suppress vibration in silent or focus modes. Treat it as best effort.
 */
export function createDeviceAlertPlayer(): AlertPlayer {
  return {
    async play(kind) {
      Vibration.vibrate(PATTERNS[kind]);
    },
  };
}
