import axios from 'axios';
import { handleGlobalError } from '../utils/errorHandler';

// The centralized axios client
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

// Request Interceptor: Attach Auth Token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Error Normalization
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let normalizedError;
    if (error.response) {
      // Normalize the error payload
      normalizedError = {
        message: error.response.data?.message || error.message || 'An unexpected error occurred',
        status: error.response.status,
        code: error.response.data?.code || 'UNKNOWN_ERROR',
        details: error.response.data?.details || {}
      };
    } else if (error.request) {
      // Network error (no response received)
      normalizedError = {
        message: 'Network error. Please check your connection.',
        status: 0,
        code: error.code || 'NETWORK_ERROR',
        isNetworkError: true
      };
    } else {
      // Request configuration error
      normalizedError = {
        message: error.message,
        status: null,
        code: 'CLIENT_CONFIG_ERROR'
      };
    }

    // Automatically trigger UI notification for the error
    handleGlobalError(normalizedError);
    
    return Promise.reject(normalizedError);
  }
);

/**
 * Utility function to check if we are in real API mode.
 * Set VITE_USE_REAL_API=true in .env to enable real API calls.
 */
export const shouldUseRealApi = () => import.meta.env.VITE_USE_REAL_API === 'true';
