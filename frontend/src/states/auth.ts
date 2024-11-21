import { atom } from 'jotai';

export const authAtom = atom<{ isAuthenticated: boolean }>({
  isAuthenticated: false,
});
