/** Thrown at startup when the environment configuration is incomplete or invalid. */
export class ConfigurationError extends Error {
  readonly problems: readonly string[];

  constructor(problems: readonly string[]) {
    super(
      `Invalid app configuration:\n- ${problems.join('\n- ')}\n` +
        'Copy .env.example to .env, then restart Metro with: pnpm start --reset-cache',
    );
    this.name = 'ConfigurationError';
    this.problems = problems;
  }
}
