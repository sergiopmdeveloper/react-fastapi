import { UserLoginSchema } from '@/modules/auth/login/schemas';
import { z } from 'zod';

export type UserLoginData = z.infer<typeof UserLoginSchema>;

export type LoginResponseSuccess = {
  user_id: string;
  access_token: string;
  token_type: string;
};

export type LoginResponseError = {
  detail: string;
};
