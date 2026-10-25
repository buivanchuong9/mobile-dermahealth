export type AlertKind = 'upcoming_turn' | 'turn_called';

/**
 * Plays a short attention cue (vibration, sound) for an alert. Implementations
 * live in `platform/` and must respect OS silent/focus modes; callers cannot
 * assume the cue is perceived.
 */
export interface AlertPlayer {
  play(kind: AlertKind): Promise<void>;
}
