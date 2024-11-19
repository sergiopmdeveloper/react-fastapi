export type UserCredentials = {
  email: string;
  password: string;
};

export type LoginSuccessResponse = {
  token: string;
  token_type: string;
};

export type LoginErrorResponse = {
  detail: string;
};