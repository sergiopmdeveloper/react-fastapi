import { API_ENDPOINTS } from '@/constants';
import { authAtom } from '@/modules/auth/states';
import { type Session } from '@/modules/auth/types';
import axios from 'axios';
import { useAtom } from 'jotai';

/**
 * Custom hook to handle authentication
 * @returns {Session} - The session
 */
export function useAuth(): Session {
  const [auth, setAuth] = useAtom(authAtom);

  const validateSession = async () => {
    const session = localStorage.getItem('session');

    if (!session) {
      setAuth({ isAuthenticated: false, userId: null });
      return;
    }

    const [userId, token] = session.split(':');

    if (!userId || !token) {
      localStorage.removeItem('session');
      setAuth({ isAuthenticated: false, userId: null });
      return;
    }

    try {
      await axios.post(
        API_ENDPOINTS.VALIDATE_SESSION,
        new URLSearchParams({
          user_id: userId,
        }),
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAuth({ isAuthenticated: true, userId });
    } catch {
      localStorage.removeItem('session');
      setAuth({ isAuthenticated: false, userId: null });
    }
  };

  return { ...auth, validateSession };
}
