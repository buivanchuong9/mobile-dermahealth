export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export type LogContext = Readonly<Record<string, unknown>>;

export type LogEntry = {
  readonly level: LogLevel;
  readonly message: string;
  readonly context?: LogContext;
};

export interface Logger {
  debug(message: string, context?: LogContext): void;
  info(message: string, context?: LogContext): void;
  warn(message: string, context?: LogContext): void;
  error(message: string, context?: LogContext): void;
}

/** Destination for already-redacted entries (console, crash reporter, ...). */
export interface LogSink {
  write(entry: LogEntry): void;
}
