import { z } from 'zod';

export const UserLoginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Email format is not valid'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
});
