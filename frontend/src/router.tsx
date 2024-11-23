import { AuthRoute, ProtectedRoute } from '@/middleware';
import LoginPage from '@/modules/auth/login';
import UserPage from '@/modules/user';
import { createBrowserRouter } from 'react-router-dom';

const ROUTES = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/user/:userId',
        element: <UserPage />,
      },
    ],
  },
  {
    element: <AuthRoute />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
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
