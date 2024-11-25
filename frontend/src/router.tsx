import { AuthRoute, ProtectedRoute } from '@/middleware';
import LoginPage from '@/modules/auth/login';
import RegisterPage from '@/modules/auth/register';
import UserPage from '@/modules/user';
import { createBrowserRouter, Navigate } from 'react-router-dom';

const ROUTES = [
  {
    path: '/auth',
    element: <Navigate to="/auth/login" replace />,
  },
  {
    element: <AuthRoute />,
    children: [
      {
        path: '/auth/login',
        element: <LoginPage />,
      },
      {
        path: '/auth/register',
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: '/user',
    element: <Navigate to="/user/redirection" replace />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/user/:userId',
        element: <UserPage />,
      },
    ],
  },
];

const ROUTER_CONFIG = {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  },
};

export const router = createBrowserRouter(ROUTES, { ...ROUTER_CONFIG });
