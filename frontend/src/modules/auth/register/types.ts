import { UserRegisterSchema } from '@/modules/auth/register/schemas';
import { z } from 'zod';

export type UserRegisterData = z.infer<typeof UserRegisterSchema>;

export type AuthResponseSuccess = {
  user_id: string;
  access_token: string;
  token_type: string;
};
