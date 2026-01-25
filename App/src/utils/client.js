import axios from "axios";
import { auth } from "../firebase";
import { BASEURL } from "./endpoint";
import { handleApiError, showErrorToast } from "./errorHandler";

const axiosInstance = axios.create({
  baseURL: BASEURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    // Allow skipping auth per request
    if (config.withAuth === false) {
      return config;
    }

    const user = auth.currentUser;

    if (user) {
      try {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        console.error('Failed to get auth token:', error);
      }
    }

    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle network errors
    if (!error.response) {
      const message = error.code === 'ECONNABORTED'
        ? 'Request timeout. Please try again.'
        : 'Network error. Please check your connection.';

      showErrorToast({ message });
      return Promise.reject(error);
    }

    const status = error.response.status;

    // Handle authentication errors
    if (status === 401) {
      handleApiError(error, {
        showToast: true,
        customMessage: 'Session expired. Please log in again.',
        onAuthError: async () => {
          try {
            await auth.signOut();
            // Redirect to login page
            window.location.href = '/login';
          } catch (signOutError) {
            console.error('Sign out error:', signOutError);
          }
        },
      });
      return Promise.reject(error);
    }

    // Handle forbidden errors
    if (status === 403) {
      handleApiError(error, {
        showToast: true,
        customMessage: 'You do not have permission to access this resource.',
      });
      return Promise.reject(error);
    }

    // Handle not found errors
    if (status === 404) {
      handleApiError(error, {
        showToast: true,
        customMessage: 'The requested resource was not found.',
      });
      return Promise.reject(error);
    }

    // Handle validation errors
    if (status >= 400 && status < 500) {
      handleApiError(error, {
        showToast: true,
      });
      return Promise.reject(error);
    }

    // Handle server errors
    if (status >= 500) {
      handleApiError(error, {
        showToast: true,
        customMessage: 'Server error. Please try again later.',
      });
      return Promise.reject(error);
    }

    // Handle other errors
    handleApiError(error, {
      showToast: true,
    });

    return Promise.reject(error);
  }
);

export default axiosInstance;
