import { loadAppConfig } from './loadAppConfig';
import type { AppConfig } from './appConfig.types';

/**
 * The application's configuration, read once at startup.
 *
 * Each variable is referenced by its literal name so the Babel plugin can
 * inline it from `.env`; do not read `process.env` anywhere else.
 */
export const appConfig: AppConfig = loadAppConfig({
  APP_ENV: process.env.APP_ENV,
  APP_LOG_LEVEL: process.env.APP_LOG_LEVEL,
  APP_API_BASE_URL: process.env.APP_API_BASE_URL,
  APP_API_TIMEOUT_MS: process.env.APP_API_TIMEOUT_MS,
  APP_DEMO_ACCOUNT_EMAIL: process.env.APP_DEMO_ACCOUNT_EMAIL,
  APP_DEMO_ACCOUNT_PASSWORD: process.env.APP_DEMO_ACCOUNT_PASSWORD,
  APP_SIMULATION_LATENCY_MS: process.env.APP_SIMULATION_LATENCY_MS,
  APP_ASSESSMENT_DURATION_MS: process.env.APP_ASSESSMENT_DURATION_MS,
  APP_QUEUE_AUTO_STEP_MS: process.env.APP_QUEUE_AUTO_STEP_MS,
});
