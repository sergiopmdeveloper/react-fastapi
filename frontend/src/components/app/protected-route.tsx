import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * Protected route wrapper
 */
export default function ProtectedRoute() {
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
