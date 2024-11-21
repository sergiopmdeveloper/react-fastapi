import { API_ENDPOINTS } from '@/constants';
import { authAtom } from '@/states/auth';
import axios from 'axios';
import { useAtom } from 'jotai';

/**
 * Custom hook to handle authentication
 * @returns {boolean} isAuthenticated - Is user authenticated
 * @returns {() => Promise<void>} validateSession - Validate user session function
 */
export function useAuth(): {
  isAuthenticated: boolean;
  validateSession: () => Promise<void>;
} {
  const [auth, setAuth] = useAtom(authAtom);

  const validateSession = async () => {
    const session = localStorage.getItem('session');

    if (!session) {
      setAuth({ isAuthenticated: false });
      return;
    }

    const [userId, token] = session.split(':');

    if (!userId || !token) {
      setAuth({ isAuthenticated: false });
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

      setAuth({ isAuthenticated: true });
    } catch {
      setAuth({ isAuthenticated: false });
    }
  };

  return { ...auth, validateSession };
}
