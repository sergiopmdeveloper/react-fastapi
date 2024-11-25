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
  return session.split(':')[1] || '';
}
