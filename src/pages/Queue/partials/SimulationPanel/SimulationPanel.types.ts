export type SimulationPanelProps = {
  readonly finished: boolean;
  readonly autoRunning: boolean;
  readonly onAdvance: () => void;
  readonly onToggleAuto: () => void;
  readonly onReset: () => void;
};
