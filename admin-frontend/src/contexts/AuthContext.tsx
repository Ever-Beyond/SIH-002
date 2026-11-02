 
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { apiClient, shouldUseRealApi } from '../api/client';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  permissions: string[];
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  isLoading: boolean;
}

const mockPermissions = [
  'VIEW_DASHBOARD', 'VIEW_FLEET', 'VIEW_DRIVERS', 'MANAGE_DRIVERS', 
  'APPROVE_REROUTE', 'VIEW_SHIPMENTS', 'CREATE_SHIPMENT', 'VIEW_ACCESSIBILITY', 
  'MANAGE_ACCESSIBILITY', 'VIEW_AI_METRICS', 'MANAGE_ALERTS', 'RUN_SIMULATION', 
  'VIEW_INCIDENTS', 'MANAGE_INCIDENTS', 'MANAGE_EMERGENCIES', 'VIEW_ANALYTICS', 
  'EXPORT_ANALYTICS', 'MANAGE_USERS', 'MANAGE_ROLES', 'SUPER_ADMIN'
];

const mockUser: User = {
  id: 'usr_001',
  name: 'Admin User',
  email: 'admin@ner-shield.gov.in',
  role: 'SUPER_ADMIN'
};

export const AuthContext = createContext<AuthContextType | null>(null);

const SESSION_KEY = 'ner_shield_mock_session';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // initially loading session

  useEffect(() => {
     
    const session = localStorage.getItem(SESSION_KEY);
    if (session) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsAuthenticated(true);
      setUser(mockUser);
      setPermissions(mockPermissions);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    if (shouldUseRealApi()) {
      try {
        const response = await apiClient.post('/auth/login', { email, password });
        setIsAuthenticated(true);
        setUser(response.data.user);
        setPermissions(response.data.permissions);
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem(SESSION_KEY, 'true');
      } catch (error) {
        const e = error instanceof Error ? error : new Error(String(error));
        console.error('Login error:', e);
        throw e;
      }
      return;
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // For development, we allow a specific mock credential
        const mockPassword = import.meta.env.VITE_MOCK_PASSWORD || 'password';
        if (email === 'admin@ner-shield.gov.in' && password === mockPassword) {
          setIsAuthenticated(true);
          setUser(mockUser);
          setPermissions(mockPermissions);
          localStorage.setItem(SESSION_KEY, 'true');
          resolve();
        } else {
          reject(new Error('Invalid email or password. Use admin@ner-shield.gov.in / password'));
        }
      }, 1000); // simulate latency
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setPermissions([]);
    localStorage.removeItem(SESSION_KEY);
  };

  const resetPassword = async (email: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock successful email dispatch
        console.log(`Password reset link sent to ${email}`);
        resolve();
      }, 1000);
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, permissions, login, logout, resetPassword, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
