import { AuthRoute, ProtectedRoute } from '@/components/app/route-wrappers';
import LoginPage from '@/pages/login';
import UserPage from '@/pages/user';
import { createBrowserRouter } from 'react-router-dom';

const routes = [
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

const config = {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  },
};

export const router = createBrowserRouter(routes, { ...config });
