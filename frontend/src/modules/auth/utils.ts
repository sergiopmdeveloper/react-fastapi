/**
 * Generates a session and stores it in the local storage
 */
export default function generateSession(userId: string, accessToken: string) {
  const session = `${userId}:${accessToken}`;
  localStorage.setItem('session', session);
}
