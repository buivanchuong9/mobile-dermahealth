/** Source of "now" as a local wall-clock string `YYYY-MM-DDTHH:mm`. */
export interface Clock {
  now(): string;
}
