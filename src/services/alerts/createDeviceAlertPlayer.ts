import { AppState, Vibration } from 'react-native';
import Sound from 'react-native-sound';
import type { AlertKind, AlertPlayer } from '@model/common';

const PATTERNS: Record<AlertKind, number[]> = {
  upcoming_turn: [0, 200],
  turn_called: [0, 300, 150, 300],
};

/** Foreground cue only. Plays on the speaker even in silent mode so the spoken ticket is heard; system volume still applies. */
export function createDeviceAlertPlayer(): AlertPlayer {
  return {
    async play(kind, options) {
      if (AppState.currentState !== 'active') return false;
      if (options.vibration) Vibration.vibrate(PATTERNS[kind]);
      if (!options.sound) return speak(options.speech);
      const played = await chime();
      const spoke = await speak(options.speech);
      return played || spoke;
    },
  };
}

/**
 * Loaded lazily: the library builds its native emitter on import, which throws
 * in a binary built before the module was linked. Speech then degrades to the
 * chime instead of crashing the app at launch.
 */
async function speak(text: string | undefined): Promise<boolean> {
  if (!text) return false;
  try {
    const Tts = (await import('react-native-tts')).default;
    await Tts.getInitStatus();
    Tts.setIgnoreSilentSwitch('ignore');
    try {
      await Tts.setDefaultLanguage('vi-VN');
    } catch (error) {
      // Voice not installed: fall back to the device default voice.
      if (__DEV__) console.warn('[tts] vi-VN unavailable', error);
    }
    Tts.stop();
    await Tts.speak(text);
    return true;
  } catch (error) {
    if (__DEV__) console.warn('[tts] speak failed', error);
    return false;
  }
}

function chime(): Promise<boolean> {
  return new Promise<boolean>(resolve => {
    try {
      Sound.setCategory('Playback', false);
      const sound = new Sound('queue_alert.wav', Sound.MAIN_BUNDLE, error => {
        if (error) {
          sound.release();
          resolve(false);
          return;
        }
        sound.play(success => {
          sound.release();
          resolve(success);
        });
      });
    } catch (error) {
      if (__DEV__) console.warn('[chime] failed', error);
      resolve(false);
    }
  });
}
