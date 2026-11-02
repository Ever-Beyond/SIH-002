import { render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { ToastProvider } from '../components';
import { routes } from '../router';

export const renderWithRouter = (initialRoute = '/') => {
  const router = createMemoryRouter(routes, {
    initialEntries: [initialRoute],
  });

  return render(
    <AuthProvider>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </AuthProvider>
  );
};
