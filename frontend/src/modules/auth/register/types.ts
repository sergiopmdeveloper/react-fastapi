import { UserRegisterSchema } from '@/modules/auth/register/schemas';
import { z } from 'zod';

export type UserRegisterData = z.infer<typeof UserRegisterSchema>;
