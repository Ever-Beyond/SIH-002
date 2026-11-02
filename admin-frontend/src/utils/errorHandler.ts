import { useNotificationStore } from '../store/notificationStore';
import { useAuthStore } from '../store/authStore';

export interface NormalizedError {
  message: string;
  status: number | null;
  code: string;
  isNetworkError?: boolean;
}

/**
 * Maps raw Axios or application errors into user-friendly notifications
 * and dispatches them to the notification store.
 */
export const handleGlobalError = (error: NormalizedError | Error | unknown) => {
  let title = 'Error';
  let message = 'An unexpected error occurred. Please try again.';
  let type: 'error' | 'warning' | 'info' = 'error';

  // Handle normalized API errors
  if (error && typeof error === 'object' && 'code' in error) {
    const err = error as NormalizedError;

    if (err.isNetworkError || err.code === 'NETWORK_ERROR' || err.status === 0) {
      title = 'Connection Lost';
      message = 'You are currently offline or the server is unreachable. Please check your internet connection.';
      type = 'warning';
    } else if (err.code === 'ECONNABORTED' || err.message?.toLowerCase().includes('timeout')) {
      title = 'Request Timeout';
      message = 'The server is taking too long to respond. Please try again later.';
      type = 'warning';
    } else if (err.status) {
      switch (err.status) {
        case 401:
          title = 'Session Expired';
          message = 'Your session has expired or you are not authorized. Please log in again.';
          useAuthStore.getState().logout();
          break;
        case 403:
          title = 'Access Denied';
          message = 'You do not have permission to perform this action.';
          break;
        case 404:
          title = 'Not Found';
          message = 'The requested resource could not be found.';
          type = 'warning';
          break;
        case 409:
          title = 'Conflict';
          message = 'There was a conflict with the current state (e.g. resource already exists).';
          break;
        case 422:
          title = 'Validation Failed';
          message = err.message || 'The data provided was invalid. Please check your inputs.';
          break;
        case 429:
          title = 'Too Many Requests';
          message = 'You are making too many requests. Please slow down and try again in a moment.';
          type = 'warning';
          break;
        case 500:
        case 502:
        case 503:
        case 504:
          title = 'Server Error';
          message = 'We encountered a server error. Our team has been notified. Please try again later.';
          break;
        default:
          message = err.message || message;
      }
    }
  } else if (error instanceof Error) {
    // Handle standard JS errors gracefully
    message = error.message;
  }

  // Dispatch to the UI toast notification system
  useNotificationStore.getState().addToast({
    title,
    message,
    type
  });
};
