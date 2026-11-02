import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handleGlobalError } from './errorHandler';
import { useNotificationStore } from '../store/notificationStore';
import { useAuthStore } from '../store/authStore';

// Mock Zustand stores
vi.mock('../store/notificationStore', () => ({
  useNotificationStore: {
    getState: vi.fn().mockReturnValue({
      addToast: vi.fn(),
    }),
  },
}));

vi.mock('../store/authStore', () => ({
  useAuthStore: {
    getState: vi.fn().mockReturnValue({
      logout: vi.fn(),
    }),
  },
}));

describe('handleGlobalError', () => {
  let addToastMock: import('vitest').Mock;
  let logoutMock: import('vitest').Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    addToastMock = vi.fn();
    logoutMock = vi.fn();

    (useNotificationStore.getState as import('vitest').Mock).mockReturnValue({
      addToast: addToastMock,
    });
    (useAuthStore.getState as import('vitest').Mock).mockReturnValue({
      logout: logoutMock,
    });
  });

  it('should handle network errors', () => {
    handleGlobalError({ code: 'NETWORK_ERROR', status: 0, message: '' });
    expect(addToastMock).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Connection Lost',
      type: 'warning',
    }));
  });

  it('should handle timeout errors', () => {
    handleGlobalError({ code: 'ECONNABORTED', status: null, message: 'timeout' });
    expect(addToastMock).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Request Timeout',
      type: 'warning',
    }));
  });

  it('should handle 401 Unauthorized and trigger logout', () => {
    handleGlobalError({ code: 'HTTP_ERROR', status: 401, message: 'Unauthorized' });
    expect(addToastMock).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Session Expired',
      type: 'error',
    }));
    expect(logoutMock).toHaveBeenCalled();
  });

  it('should handle 403 Forbidden', () => {
    handleGlobalError({ code: 'HTTP_ERROR', status: 403, message: 'Forbidden' });
    expect(addToastMock).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Access Denied',
      type: 'error',
    }));
  });

  it('should handle 404 Not Found', () => {
    handleGlobalError({ code: 'HTTP_ERROR', status: 404, message: 'Not Found' });
    expect(addToastMock).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Not Found',
      type: 'warning',
    }));
  });

  it('should handle 500 Server Error', () => {
    handleGlobalError({ code: 'HTTP_ERROR', status: 500, message: 'Internal Server Error' });
    expect(addToastMock).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Server Error',
      type: 'error',
    }));
  });

  it('should handle standard Error instances', () => {
    const error = new Error('Custom JS Error');
    handleGlobalError(error);
    expect(addToastMock).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Error',
      message: 'Custom JS Error',
      type: 'error',
    }));
  });
});
