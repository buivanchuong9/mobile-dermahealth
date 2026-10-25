import type { LogSink } from '../contracts';

/** Writes already-redacted entries to the JS console. */
export const consoleLogSink: LogSink = {
  write({ level, message, context }) {
    const args = context === undefined ? [message] : [message, context];
    console[level](...args);
  },
};
