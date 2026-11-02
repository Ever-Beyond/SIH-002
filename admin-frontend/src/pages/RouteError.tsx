import { useRouteError } from 'react-router-dom';
import { ErrorState } from '../components/ErrorState/ErrorState';

export const RouteError = () => {
  const error = useRouteError() as any;
  const message = error?.message || error?.statusText || 'An unexpected error occurred while rendering this page.';
  
  return (
    <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center', height: '100%', alignItems: 'center' }}>
      <ErrorState 
        title="Application Error" 
        message={message} 
        onRetry={() => window.location.reload()}
      />
    </div>
  );
};
