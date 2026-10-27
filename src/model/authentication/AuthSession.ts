/** Identity of the simulated signed-in user. Holds no credentials. */
export type AuthSession = {
  readonly userId: string;
  readonly fullName: string;
  readonly email: string;
};

export type SignInInput = { readonly email: string; readonly password: string };

export type RegistrationInput = {
  readonly fullName: string;
  readonly email: string;
  readonly phone: string;
  readonly password: string;
};
