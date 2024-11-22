import { atom } from 'jotai';

export const authAtom = atom<{
  isAuthenticated: boolean;
  userId: string | null;
}>({
  isAuthenticated: false,
  userId: null,
});
