import { sessionAtom } from '@/modules/auth/states';
import { getSessionUserId, validateSession } from '@/modules/auth/utils';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * Protected route wrapper that redirects
 * to login page if user is not authenticated
 */
export function ProtectedRoute() {
  const [loaded, setLoaded] = useState(false);
  const [session, setSession] = useAtom(sessionAtom);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    const validateSessionHandler = async () => {
      await validateSession(session, setSession);
    };

    if (loaded) {
      validateSessionHandler();
      setChecked(true);
    }
  }, [loaded]);

  if (!checked) {
    return;
  }

  return session ? <Outlet /> : <Navigate to="/auth/login" replace />;
}

/**
 * Auth route wrapper that redirects
 * to user profile if user is authenticated
 */
export function AuthRoute() {
  const [loaded, setLoaded] = useState(false);
  const [session, setSession] = useAtom(sessionAtom);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    const validateSessionHandler = async () => {
      await validateSession(session, setSession);
    };

    if (loaded) {
      validateSessionHandler();
      setChecked(true);
    }
  }, [loaded]);

  if (!checked) {
    return;
  }

  return session ? (
    <Navigate to={`/user/${getSessionUserId(session)}`} replace />
  ) : (
    <Outlet />
  );
}
