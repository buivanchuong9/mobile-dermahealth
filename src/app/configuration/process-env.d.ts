/**
 * Minimal typing for `process.env`. Metro/Babel replace `process.env.APP_*`
 * with literals at bundle time (see scripts/env/inlineEnvPlugin.js); no other
 * use of `process` is supported in application code.
 */
declare const process: {
  readonly env: Readonly<Record<string, string | undefined>>;
};
