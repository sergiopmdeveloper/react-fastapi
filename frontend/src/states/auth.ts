import { atom } from 'jotai';

export type AuthState = {
  isAuthenticated: boolean;
  userId: string | null;
};

export const authAtom = atom<AuthState>({
  isAuthenticated: false,
  userId: null,
});
