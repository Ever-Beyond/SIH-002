import type { ReactNode } from 'react';
import { useAuth } from '../../contexts';
import { ErrorState } from '../ErrorState';

interface PermissionRouteProps {
  children: ReactNode;
  requiredPermission: string;
}

export const PermissionRoute = ({ children, requiredPermission }: PermissionRouteProps) => {
  const { permissions, user } = useAuth();
  
  const hasPermission = user?.role === 'SUPER_ADMIN' || permissions.includes(requiredPermission);

  if (!hasPermission) {
    return (
      <div style={{ padding: '2rem' }}>
        <ErrorState 
          title="Access Denied" 
          message="You do not have the required permissions to view this resource." 
        />
      </div>
    );
  }

  return <>{children}</>;
};
