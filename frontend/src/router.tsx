import { AuthRoute, ProtectedRoute } from '@/components/app/route-wrappers';
import LoginPage from '@/pages/login';
import { createBrowserRouter } from 'react-router-dom';

const routes = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/user/:user_id',
        element: <h1>User page</h1>,
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
