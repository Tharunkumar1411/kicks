import { toast } from 'react-toastify';

/**
 * Error types for categorization
 */
export const ErrorTypes = {
  NETWORK: 'NETWORK_ERROR',
  AUTH: 'AUTH_ERROR',
  VALIDATION: 'VALIDATION_ERROR',
  SERVER: 'SERVER_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  UNKNOWN: 'UNKNOWN_ERROR',
};

/**
 * User-friendly error messages
 */
export const ErrorMessages = {
  [ErrorTypes.NETWORK]: 'Network error. Please check your internet connection and try again.',
  [ErrorTypes.AUTH]: 'Authentication failed. Please log in again.',
  [ErrorTypes.VALIDATION]: 'Please check your input and try again.',
  [ErrorTypes.SERVER]: 'Server error. Please try again later.',
  [ErrorTypes.NOT_FOUND]: 'The requested resource was not found.',
  [ErrorTypes.UNKNOWN]: 'An unexpected error occurred. Please try again.',
  TIMEOUT: 'Request timed out. Please try again.',
  OFFLINE: 'You appear to be offline. Please check your connection.',
};

/**
 * Determines error type from axios error
 */
export const getErrorType = (error) => {
  if (!error.response) {
    // Network error or request timeout
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      return ErrorTypes.NETWORK;
    }
    return ErrorTypes.NETWORK;
  }

  const status = error.response.status;

  if (status === 401 || status === 403) {
    return ErrorTypes.AUTH;
  }

  if (status === 404) {
    return ErrorTypes.NOT_FOUND;
  }

  if (status >= 400 && status < 500) {
    return ErrorTypes.VALIDATION;
  }

  if (status >= 500) {
    return ErrorTypes.SERVER;
  }

  return ErrorTypes.UNKNOWN;
};

/**
 * Get user-friendly error message
 */
export const getErrorMessage = (error) => {
  // Custom message from backend
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  // Custom message from backend (alternative format)
  if (error?.response?.data?.error) {
    return error.response.data.error;
  }

  const errorType = getErrorType(error);
  return ErrorMessages[errorType] || ErrorMessages[ErrorTypes.UNKNOWN];
};

/**
 * Show error toast notification
 */
export const showErrorToast = (error, customMessage = null) => {
  const message = customMessage || getErrorMessage(error);

  toast.error(message, {
    toastId: `error-${Date.now()}`,
  });
};

/**
 * Show success toast notification
 */
export const showSuccessToast = (message) => {
  toast.success(message, {
    toastId: `success-${Date.now()}`,
  });
};

/**
 * Show info toast notification
 */
export const showInfoToast = (message) => {
  toast.info(message, {
    toastId: `info-${Date.now()}`,
  });
};

/**
 * Show warning toast notification
 */
export const showWarningToast = (message) => {
  toast.warning(message, {
    toastId: `warning-${Date.now()}`,
  });
};

/**
 * Handle API errors with retry logic
 */
export const handleApiError = (error, options = {}) => {
  const {
    showToast = true,
    customMessage = null,
    onAuthError = null,
    onServerError = null,
  } = options;

  const errorType = getErrorType(error);

  // Handle auth errors
  if (errorType === ErrorTypes.AUTH && onAuthError) {
    onAuthError(error);
  }

  // Handle server errors
  if (errorType === ErrorTypes.SERVER && onServerError) {
    onServerError(error);
  }

  // Show toast if enabled
  if (showToast) {
    showErrorToast(error, customMessage);
  }

  // Log error in development
  if (process.env.NODE_ENV === 'development') {
    console.error('API Error:', error);
  }

  return {
    error,
    errorType,
    message: getErrorMessage(error),
  };
};

/**
 * Retry function for failed requests
 */
export const retryRequest = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) {
      throw error;
    }

    const errorType = getErrorType(error);

    // Don't retry on auth or validation errors
    if (errorType === ErrorTypes.AUTH || errorType === ErrorTypes.VALIDATION) {
      throw error;
    }

    // Wait before retrying
    await new Promise(resolve => setTimeout(resolve, delay));

    return retryRequest(fn, retries - 1, delay * 2);
  }
};
