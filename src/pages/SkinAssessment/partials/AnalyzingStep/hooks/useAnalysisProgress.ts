import { useEffect, useState } from 'react';

const TICK_MS = 240;
const MAX_WHILE_RUNNING = 0.9;
const STEP = 0.09;

/** Estimated progress while a simulated analysis runs; frozen when it stops. */
export function useAnalysisProgress(running: boolean): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!running) {
      return undefined;
    }
    setProgress(0);
    const timer = setInterval(() => {
      setProgress(current => Math.min(MAX_WHILE_RUNNING, current + STEP));
    }, TICK_MS);
    return () => clearInterval(timer);
  }, [running]);

  return progress;
}
