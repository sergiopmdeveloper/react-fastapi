export type AuthState = {
  isAuthenticated: boolean;
  userId: string | null;
};

export type Session = AuthState & {
  validateSession: () => Promise<void>;
};
