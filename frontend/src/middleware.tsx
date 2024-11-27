import useAuth from '@/modules/auth/hooks';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * Protected route wrapper that redirects
 * to login page if user is not authenticated
 */
export function ProtectedRoute() {
  const { session, validatingSession } = useAuth();

  if (validatingSession) {
    return;
  }

  return session ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login?next=forbidden" replace />
  );
}

/**
 * Auth route wrapper that redirects
 * to user profile if user is authenticated
 */
export function AuthRoute() {
  const { session, userId, validatingSession } = useAuth();

  if (validatingSession) {
    return;
  }

  return session ? <Navigate to={`/user/${userId}`} replace /> : <Outlet />;
}
