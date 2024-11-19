export type UserCredentials = {
  email: string;
  password: string;
};

export type LoginSuccessResponse = {
  user_id: string;
  access_token: string;
  token_type: string;
};

export type LoginErrorResponse = {
  detail: string;
};
