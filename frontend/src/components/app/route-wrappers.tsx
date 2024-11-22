import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * Protected route wrapper that redirects
 * to login page if user is not authenticated
 */
export function ProtectedRoute() {
  const { validateSession, isAuthenticated } = useAuth();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const validateSessionHandler = async () => {
      await validateSession();
      setChecked(true);
    };

    validateSessionHandler();
  }, []);

  if (!checked) {
    return;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

/**
 * Auth route wrapper that redirects
 * to user profile if user is authenticated
 */
export function AuthRoute() {
  const { validateSession, isAuthenticated, userId } = useAuth();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const validateSessionHandler = async () => {
      await validateSession();
      setChecked(true);
    };
    validateSessionHandler();
  }, []);

  if (!checked) {
    return;
  }

  return isAuthenticated ? (
    <Navigate to={`/user/${userId}`} replace />
  ) : (
    <Outlet />
  );
}
