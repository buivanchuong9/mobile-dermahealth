import type { LogLevel } from '@core/contracts';
import { ConfigurationError } from './ConfigurationError';
import { APP_ENVIRONMENTS } from './appConfig.types';
import type {
  AppConfig,
  AppEnvironment,
  DemoAccountConfig,
  RawAppEnv,
} from './appConfig.types';

const LOG_LEVELS: readonly LogLevel[] = ['debug', 'info', 'warn', 'error'];
const MAX_TIMING_MS = 60_000;

const isBlank = (value: string | undefined): value is undefined | '' =>
  value === undefined || value.trim() === '';

function parseChoice<T extends string>(
  name: string,
  value: string | undefined,
  choices: readonly T[],
  problems: string[],
): T | null {
  if (isBlank(value)) {
    problems.push(`${name} is required (one of: ${choices.join(', ')}).`);
    return null;
  }
  const match = choices.find(choice => choice === value.trim());
  if (match === undefined) {
    problems.push(`${name} must be one of: ${choices.join(', ')}.`);
    return null;
  }
  return match;
}

function parseOptionalMilliseconds(
  name: string,
  value: string | undefined,
  problems: string[],
): number | undefined {
  if (isBlank(value)) {
    return undefined;
  }
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 0 || parsed > MAX_TIMING_MS) {
    problems.push(
      `${name} must be a whole number of milliseconds (0-${MAX_TIMING_MS}).`,
    );
    return undefined;
  }
  return parsed;
}

function parseDemoAccount(
  raw: RawAppEnv,
  environment: AppEnvironment | null,
  problems: string[],
): DemoAccountConfig | null {
  const email = raw.APP_DEMO_ACCOUNT_EMAIL;
  const password = raw.APP_DEMO_ACCOUNT_PASSWORD;
  if (isBlank(email) && isBlank(password)) {
    return null;
  }
  if (isBlank(email) || isBlank(password)) {
    problems.push(
      'APP_DEMO_ACCOUNT_EMAIL and APP_DEMO_ACCOUNT_PASSWORD must be set together or both left empty.',
    );
    return null;
  }
  if (environment === 'production') {
    problems.push(
      'The demo account must not be configured when APP_ENV=production.',
    );
    return null;
  }
  return { email: email.trim(), password };
}

/**
 * Validates raw environment variables and returns the typed configuration.
 * Throws a ConfigurationError listing every problem at once.
 */
export function loadAppConfig(raw: RawAppEnv): AppConfig {
  const problems: string[] = [];
  const environment = parseChoice(
    'APP_ENV',
    raw.APP_ENV,
    APP_ENVIRONMENTS,
    problems,
  );
  const logLevel = parseChoice(
    'APP_LOG_LEVEL',
    raw.APP_LOG_LEVEL,
    LOG_LEVELS,
    problems,
  );
  const demoAccount = parseDemoAccount(raw, environment, problems);
  const latencyMs = parseOptionalMilliseconds(
    'APP_SIMULATION_LATENCY_MS',
    raw.APP_SIMULATION_LATENCY_MS,
    problems,
  );
  const assessmentDurationMs = parseOptionalMilliseconds(
    'APP_ASSESSMENT_DURATION_MS',
    raw.APP_ASSESSMENT_DURATION_MS,
    problems,
  );
  const queueAutoStepMs = parseOptionalMilliseconds(
    'APP_QUEUE_AUTO_STEP_MS',
    raw.APP_QUEUE_AUTO_STEP_MS,
    problems,
  );

  if (problems.length > 0 || environment === null || logLevel === null) {
    throw new ConfigurationError(problems);
  }
  return {
    environment,
    logLevel,
    demoAccount,
    simulation: { latencyMs, assessmentDurationMs, queueAutoStepMs },
  };
}
