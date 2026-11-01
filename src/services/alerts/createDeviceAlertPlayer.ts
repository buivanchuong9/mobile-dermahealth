import { AppState, Vibration } from 'react-native';
import Sound from 'react-native-sound';
import type { AlertKind, AlertPlayer } from '@model/common';

const PATTERNS: Record<AlertKind, number[]> = {
  upcoming_turn: [0, 200],
  turn_called: [0, 300, 150, 300],
};

/** Foreground cue only. System volume, silent mode and audio routing still apply. */
export function createDeviceAlertPlayer(): AlertPlayer {
  return {
    async play(kind, options) {
      if (AppState.currentState !== 'active') return false;
      if (options.vibration) Vibration.vibrate(PATTERNS[kind]);
      if (!options.sound) return true;
      return new Promise<boolean>(resolve => {
        try {
          Sound.setCategory('Ambient', true);
          const sound = new Sound(
            'queue_alert.wav',
            Sound.MAIN_BUNDLE,
            error => {
              if (error) {
                sound.release();
                resolve(false);
                return;
              }
              sound.play(success => {
                sound.release();
                resolve(success);
              });
            },
          );
        } catch {
          resolve(false);
        }
      });
    },
  };
}
