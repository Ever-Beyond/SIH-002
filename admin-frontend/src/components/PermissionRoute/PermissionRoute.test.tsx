import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { PermissionRoute } from './PermissionRoute';
import { useAuth } from '../../contexts';

vi.mock('../../contexts', () => ({
  useAuth: vi.fn(),
}));

describe('PermissionRoute', () => {
  it('should render children if user has required permission', () => {
    (useAuth as unknown as { mockReturnValue: (val: unknown) => void }).mockReturnValue({
      user: { role: 'USER' },
      permissions: ['VIEW_DASHBOARD'],
    });

    const { getByText } = render(
      <PermissionRoute requiredPermission="VIEW_DASHBOARD">
        <div>Allowed Content</div>
      </PermissionRoute>
    );

    expect(getByText('Allowed Content')).toBeInTheDocument();
  });

  it('should render children if user is SUPER_ADMIN even without specific permission', () => {
    (useAuth as unknown as { mockReturnValue: (val: unknown) => void }).mockReturnValue({
      user: { role: 'SUPER_ADMIN' },
      permissions: [],
    });

    const { getByText } = render(
      <PermissionRoute requiredPermission="VIEW_DASHBOARD">
        <div>Allowed Content</div>
      </PermissionRoute>
    );

    expect(getByText('Allowed Content')).toBeInTheDocument();
  });

  it('should render Access Denied error if user lacks permission and is not SUPER_ADMIN', () => {
    (useAuth as unknown as { mockReturnValue: (val: unknown) => void }).mockReturnValue({
      user: { role: 'USER' },
      permissions: ['VIEW_SOMETHING_ELSE'],
    });

    const { getByText, queryByText } = render(
      <PermissionRoute requiredPermission="VIEW_DASHBOARD">
        <div>Allowed Content</div>
      </PermissionRoute>
    );

    expect(queryByText('Allowed Content')).not.toBeInTheDocument();
    expect(getByText('Access Denied')).toBeInTheDocument();
    expect(getByText('You do not have the required permissions to view this resource.')).toBeInTheDocument();
  });
});
