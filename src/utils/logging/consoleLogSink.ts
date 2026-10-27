import type { LogSink } from '../../model/common';

/** Writes already-redacted entries to the JS console. */
export const consoleLogSink: LogSink = {
  write({ level, message, context }) {
    const args = context === undefined ? [message] : [message, context];
    console[level](...args);
  },
};
