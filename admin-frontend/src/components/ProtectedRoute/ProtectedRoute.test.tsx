import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { useAuth } from '../../contexts';

vi.mock('../../contexts', () => ({
  useAuth: vi.fn(),
}));

describe('ProtectedRoute', () => {
  it('should redirect to /login if not authenticated', () => {
    (useAuth as unknown as { mockReturnValue: (val: unknown) => void }).mockReturnValue({ isAuthenticated: false });
    
    const { getByText } = render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route 
            path="/protected" 
            element={
              <ProtectedRoute>
                <div>Protected Content</div>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </MemoryRouter>
    );
    
    expect(getByText('Login Page')).toBeInTheDocument();
  });

  it('should render children if authenticated', () => {
    (useAuth as unknown as { mockReturnValue: (val: unknown) => void }).mockReturnValue({ isAuthenticated: true });
    
    const { getByText } = render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route 
            path="/protected" 
            element={
              <ProtectedRoute>
                <div>Protected Content</div>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </MemoryRouter>
    );
    
    expect(getByText('Protected Content')).toBeInTheDocument();
  });
});
