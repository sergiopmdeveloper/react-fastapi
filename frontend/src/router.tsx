import { createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/login';

const routes = [
  {
    path: '/login',
    element: <LoginPage />,
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
