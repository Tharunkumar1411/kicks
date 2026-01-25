import axios from "axios";
import { handleApiError, showErrorToast } from "./errorHandler";

const defaultOptions = () => {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 15000,
  };
};

export const axiosInstance = (withAuth = true, showToastOnError = true) => {
  const instance = axios.create({
    baseURL: "",
    ...defaultOptions(),
  });

  // Request interceptor
  instance.interceptors.request.use(
    (config) => {
      // Add any auth headers here if needed in the future
      return config;
    },
    (error) => {
      console.error('Request error:', error);
      return Promise.reject(error);
    }
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Only show toast if enabled
      if (!showToastOnError) {
        throw error;
      }

      // Handle network errors
      if (!error.response) {
        const message = error.code === 'ECONNABORTED'
          ? 'Request timeout. Please try again.'
          : 'Network error. Please check your connection.';

        showErrorToast({ message });
        throw error;
      }

      const status = error.response.status;

      // Handle authentication errors
      if (status === 401) {
        handleApiError(error, {
          showToast: true,
          customMessage: 'Authentication required. Please log in.',
        });
        throw error;
      }

      // Handle forbidden errors
      if (status === 403) {
        handleApiError(error, {
          showToast: true,
          customMessage: 'You do not have permission to access this resource.',
        });
        throw error;
      }

      // Handle not found errors
      if (status === 404) {
        handleApiError(error, {
          showToast: true,
          customMessage: 'The requested resource was not found.',
        });
        throw error;
      }

      // Handle validation errors
      if (status >= 400 && status < 500) {
        handleApiError(error, {
          showToast: true,
        });
        throw error;
      }

      // Handle server errors
      if (status >= 500) {
        handleApiError(error, {
          showToast: true,
          customMessage: 'Server error. Please try again later.',
        });
        throw error;
      }

      // Handle other errors
      handleApiError(error, {
        showToast: true,
      });

      throw error;
    }
  );

  return instance;
};