import { API_ENDPOINTS } from '@/constants';
import axios from 'axios';

/**
 * Gets the user ID from the session
 * @param {string} session - The session
 * @returns {string} - The user ID
 */
export function getSessionUserId(session: string): string {
  return session.split(':')[0];
}

/**
 * Gets the token from the session
 * @param {string} session - The session
 * @returns {string} - The token
 */
export function getSessionToken(session: string): string {
  return session.split(':')[1];
}

/**
 * Validates the session
 * @param {string} session - The session
 * @param {Function} setSession - The session setter
 */
export async function validateSession(
  session: string,
  setSession: (value: string) => void
) {
  if (!session) {
    setSession('');
    return;
  }

  const userId = getSessionUserId(session);
  const token = getSessionToken(session);

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
}
