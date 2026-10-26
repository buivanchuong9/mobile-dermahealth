import type { LogLevel } from '@core/contracts';

export const APP_ENVIRONMENTS = [
  'development',
  'staging',
  'production',
] as const;
export type AppEnvironment = (typeof APP_ENVIRONMENTS)[number];

/** Raw, unvalidated variables exactly as read from the environment. */
export type RawAppEnv = Readonly<{
  APP_ENV: string | undefined;
  APP_LOG_LEVEL: string | undefined;
  APP_DEMO_ACCOUNT_EMAIL: string | undefined;
  APP_DEMO_ACCOUNT_PASSWORD: string | undefined;
  APP_SIMULATION_LATENCY_MS: string | undefined;
  APP_ASSESSMENT_DURATION_MS: string | undefined;
  APP_QUEUE_AUTO_STEP_MS: string | undefined;
}>;

/** Public demo credentials of the simulated sign-in. Not a real account. */
export type DemoAccountConfig = {
  readonly email: string;
  readonly password: string;
};

export type SimulationTimingConfig = {
  /** Undefined means "use the module's built-in default". */
  readonly latencyMs: number | undefined;
  readonly assessmentDurationMs: number | undefined;
  readonly queueAutoStepMs: number | undefined;
};

/** Validated public client configuration. Every value is visible in the bundle. */
export type AppConfig = {
  readonly environment: AppEnvironment;
  readonly logLevel: LogLevel;
  /** `null` when no demo account is configured. */
  readonly demoAccount: DemoAccountConfig | null;
  readonly simulation: SimulationTimingConfig;
};
