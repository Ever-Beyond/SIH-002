import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ToastProvider } from './components';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AuthProvider } from './contexts';
import { router } from './router';
import { handleGlobalError } from './utils/errorHandler';

function App() {
  // Listen for global offline/online events
  useEffect(() => {
    const handleOffline = () => {
      handleGlobalError({
        message: 'You are currently offline. Please check your internet connection.',
        status: 0,
        code: 'NETWORK_ERROR',
        isNetworkError: true
      });
    };

    const handleOnline = () => {
      // Could potentially dispatch a success toast here if desired
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return (
    <ErrorBoundary>
      <AuthProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
