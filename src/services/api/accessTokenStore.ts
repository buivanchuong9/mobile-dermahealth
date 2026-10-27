/**
 * Holds the access token in memory only. It is deliberately not persisted:
 * tokens belong to secure storage (see docs/security/data-storage-policy.md),
 * which the sign-in flow plugs in when real authentication is wired.
 */
export type AccessTokenStore = {
  get(): string | null;
  set(token: string): void;
  clear(): void;
};

export function createAccessTokenStore(): AccessTokenStore {
  let token: string | null = null;
  return {
    get: () => token,
    set: value => {
      token = value;
    },
    clear: () => {
      token = null;
    },
  };
}
