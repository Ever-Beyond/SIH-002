/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { apiClient } from './client';
import { handleGlobalError } from '../utils/errorHandler';

// Mock the errorHandler
vi.mock('../utils/errorHandler', () => ({
  handleGlobalError: vi.fn(),
}));

describe('apiClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('should attach Authorization header if token exists', async () => {
    localStorage.setItem('auth_token', 'test_token');
    
    const requestInterceptor = (apiClient.interceptors.request as any).handlers[0].fulfilled;
    const config = { headers: {} };
    
    const result = await requestInterceptor(config);
    expect(result.headers.Authorization).toBe('Bearer test_token');
  });

  it('should not attach Authorization header if token does not exist', async () => {
    const requestInterceptor = (apiClient.interceptors.request as any).handlers[0].fulfilled;
    const config = { headers: {} };
    
    const result = await requestInterceptor(config);
    expect(result.headers.Authorization).toBeUndefined();
  });

  it('should normalize 401 response error and call handleGlobalError', async () => {
    const responseInterceptorError = (apiClient.interceptors.response as any).handlers[0].rejected;
    const mockError = {
      response: {
        status: 401,
        data: { message: 'Unauthorized access', code: 'UNAUTHORIZED' }
      }
    };
    
    try {
      await responseInterceptorError(mockError);
    } catch (e: unknown) {
      const err = e as any;
      expect(err.status).toBe(401);
      expect(err.message).toBe('Unauthorized access');
      expect(handleGlobalError).toHaveBeenCalledWith(err);
    }
  });

  it('should normalize network error and call handleGlobalError', async () => {
    const responseInterceptorError = (apiClient.interceptors.response as any).handlers[0].rejected;
    const mockError = {
      request: {}, // Indicates a network error
      code: 'ERR_NETWORK'
    };
    
    try {
      await responseInterceptorError(mockError);
    } catch (e: unknown) {
      const err = e as any;
      expect(err.status).toBe(0);
      expect(err.isNetworkError).toBe(true);
      expect(handleGlobalError).toHaveBeenCalledWith(err);
    }
  });
});
