import { type AuthState } from '@/modules/auth/types';
import { atom } from 'jotai';

export const authAtom = atom<AuthState>({
  isAuthenticated: false,
  userId: null,
});
