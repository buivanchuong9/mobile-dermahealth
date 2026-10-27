import type { LogContext, Logger, LogLevel, LogSink } from '../../model/common';
import { redactString, redactValue } from './redact';

const LEVEL_ORDER: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

export type CreateLoggerOptions = {
  readonly sink: LogSink;
  readonly minLevel?: LogLevel;
};

/** Creates a Logger that redacts every message and context before the sink. */
export function createLogger({
  sink,
  minLevel = 'info',
}: CreateLoggerOptions): Logger {
  const log = (level: LogLevel, message: string, context?: LogContext) => {
    if (LEVEL_ORDER[level] < LEVEL_ORDER[minLevel]) {
      return;
    }
    const safeMessage = redactString(message);
    if (context === undefined) {
      sink.write({ level, message: safeMessage });
      return;
    }
    sink.write({
      level,
      message: safeMessage,
      context: redactValue(context) as LogContext,
    });
  };

  return {
    debug: (message, context) => log('debug', message, context),
    info: (message, context) => log('info', message, context),
    warn: (message, context) => log('warn', message, context),
    error: (message, context) => log('error', message, context),
  };
}
