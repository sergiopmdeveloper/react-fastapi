import { API_ENDPOINTS } from '@/constants';
import { sessionAtom } from '@/modules/auth/states';
import { type Session } from '@/modules/auth/types';
import { getSessionToken, getSessionUserId } from '@/modules/auth/utils';
import axios from 'axios';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

/**
 * Custom hook to validate and get the current session
 * and the user id and token associated with it
 * @returns {Session} The current session
 */
export default function useAuth(): Session {
  const [mounted, setMounted] = useState(false);
  const [session, setSession] = useAtom(sessionAtom);
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');
  const [validatingSession, setvalidatingSession] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const validateSessionHandler = async () => {
      if (!session) {
        setSession('');
        return;
      }

      const userId = getSessionUserId(session);
      const token = getSessionToken(session);

      setUserId(userId);
      setToken(token);

      if (!userId || !token) {
        setSession('');
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
      } catch {
        setSession('');
      }
    };

    if (mounted) {
      validateSessionHandler();
      setvalidatingSession(false);
    }
  }, [mounted]);

  return { session, userId, token, validatingSession };
}
