# Error Handling Guide

This document explains how to use the comprehensive error handling system implemented in the Kicks application.

## Table of Contents

1. [Overview](#overview)
2. [Error Handling Utilities](#error-handling-utilities)
3. [Toast Notifications](#toast-notifications)
4. [Error Boundary](#error-boundary)
5. [API Error Handling](#api-error-handling)
6. [Best Practices](#best-practices)
7. [Examples](#examples)

---

## Overview

The application now has a comprehensive error handling system that includes:

- **Global axios interceptors** for automatic API error handling
- **Toast notifications** for user-friendly error messages
- **Error boundaries** to catch React component errors
- **Retry logic** for network failures
- **Custom error handling utilities**

---

## Error Handling Utilities

Location: `src/utils/errorHandler.js`

### Available Functions

#### `showErrorToast(error, customMessage)`
Shows an error toast notification to the user.

```javascript
import { showErrorToast } from '../utils/errorHandler';

try {
  // some code
} catch (error) {
  showErrorToast(error, 'Custom error message');
}
```

#### `showSuccessToast(message)`
Shows a success toast notification.

```javascript
import { showSuccessToast } from '../utils/errorHandler';

showSuccessToast('Product added to cart successfully!');
```

#### `showInfoToast(message)`
Shows an info toast notification.

```javascript
import { showInfoToast } from '../utils/errorHandler';

showInfoToast('Please complete your profile');
```

#### `showWarningToast(message)`
Shows a warning toast notification.

```javascript
import { showWarningToast } from '../utils/errorHandler';

showWarningToast('Stock is running low!');
```

#### `handleApiError(error, options)`
Comprehensive API error handler with options.

```javascript
import { handleApiError } from '../utils/errorHandler';

try {
  await apiCall();
} catch (error) {
  handleApiError(error, {
    showToast: true,
    customMessage: 'Failed to load data',
    onAuthError: () => {
      // Handle auth error
    },
    onServerError: () => {
      // Handle server error
    },
  });
}
```

#### `retryRequest(fn, retries, delay)`
Automatically retry failed requests.

```javascript
import { retryRequest } from '../utils/errorHandler';

const data = await retryRequest(
  () => axiosInstance().get('/api/data'),
  3, // retry 3 times
  1000 // initial delay 1 second (doubles on each retry)
);
```

---

## Toast Notifications

Toast notifications are automatically configured in both apps:

- **App**: `App/src/App.jsx`
- **homeAndCheckout**: `homeAndCheckout/src/App.jsx`

### Toast Configuration

```javascript
export const toastConfig = {
  position: "top-center",
  autoClose: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
  newestOnTop: false,
  hideProgressBar: false,
};
```

### Toast Types

- **Success** (green): Operation completed successfully
- **Error** (red): Operation failed
- **Info** (blue): Informational messages
- **Warning** (yellow): Warning messages

---

## Error Boundary

Error boundaries catch JavaScript errors anywhere in the component tree and display a fallback UI.

### Location

- `App/src/components/ErrorBoundary/`
- `homeAndCheckout/src/components/ErrorBoundary/`

### Usage

Error boundaries are automatically wrapped around the entire application in `App.jsx`:

```javascript
<ErrorBoundary>
  <BrowserRouter>
    <AppRoutes />
    <ToastContainer {...toastConfig} />
  </BrowserRouter>
</ErrorBoundary>
```

### Features

- **Fallback UI**: Shows a user-friendly error page
- **Try Again**: Button to reset the error state
- **Go to Home**: Button to navigate to homepage
- **Error Details** (Dev only): Shows error stack trace in development

---

## API Error Handling

### Axios Interceptors

Both apps have axios interceptors that automatically handle:

- **Network errors**: Timeout, connection issues
- **401 (Unauthorized)**: Session expired, auto-logout
- **403 (Forbidden)**: Permission denied
- **404 (Not Found)**: Resource not found
- **4xx errors**: Validation errors
- **5xx errors**: Server errors

### Error Response Format

The backend should return errors in this format:

```json
{
  "message": "User-friendly error message",
  "error": "Technical error details"
}
```

### Disabling Toast for Specific Requests

```javascript
// In homeAndCheckout
const instance = axiosInstance(true, false); // showToastOnError = false
const response = await instance.get('/api/data');
```

---

## Best Practices

### 1. Always Use Try-Catch in API Calls

```javascript
const fetchData = async () => {
  try {
    const data = await apiCall();
    // Handle success
  } catch (error) {
    // Error is already handled by axios interceptor
    // Just handle loading state or component-specific logic
    console.error('Failed to fetch data:', error);
  }
};
```

### 2. Use Retry Logic for Network-Sensitive Operations

```javascript
import { retryRequest } from '../utils/errorHandler';

const data = await retryRequest(
  () => getHomeDetails(),
  2 // retry twice
);
```

### 3. Show Success Messages for User Actions

```javascript
import { showSuccessToast } from '../utils/errorHandler';

const handleAddToCart = async () => {
  try {
    await addToCartAPI(product);
    showSuccessToast('Product added to cart!');
  } catch (error) {
    // Error toast is shown automatically
  }
};
```

### 4. Don't Retry on Auth/Validation Errors

The `retryRequest` utility automatically skips retries for:
- 401 (Authentication errors)
- 403 (Authorization errors)
- 400-499 (Validation errors)

### 5. Log Errors in Development

```javascript
if (process.env.NODE_ENV === 'development') {
  console.error('Detailed error:', error);
}
```

---

## Examples

### Example 1: Fetching Data with Error Handling

```javascript
import { getHomeDetails } from '../api/home';

const MyComponent = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHomeDetails();
        setHomeDetails(data);
      } catch (error) {
        // Error toast is shown automatically
        // Handle component state
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ... rest of component
};
```

### Example 2: Form Submission with Custom Error Message

```javascript
import { handleApiError, showSuccessToast } from '../utils/errorHandler';

const handleSubmit = async (formData) => {
  try {
    await submitForm(formData);
    showSuccessToast('Form submitted successfully!');
  } catch (error) {
    handleApiError(error, {
      showToast: true,
      customMessage: 'Failed to submit form. Please check your input.',
    });
  }
};
```

### Example 3: Using Retry Logic

```javascript
import { retryRequest, showSuccessToast } from '../utils/errorHandler';

const syncData = async () => {
  try {
    const result = await retryRequest(
      () => axiosInstance().post('/api/sync', data),
      3, // retry 3 times
      2000 // start with 2 second delay
    );
    showSuccessToast('Data synced successfully!');
  } catch (error) {
    // After 3 retries, error toast is shown automatically
  }
};
```

### Example 4: Handling Specific Error Types

```javascript
import { ErrorTypes, getErrorType, showWarningToast } from '../utils/errorHandler';

try {
  await apiCall();
} catch (error) {
  const errorType = getErrorType(error);

  if (errorType === ErrorTypes.NETWORK) {
    showWarningToast('Please check your internet connection');
  }
  // Other error types are handled by interceptor
}
```

---

## Error Types

The system categorizes errors into:

- `NETWORK_ERROR`: Network/connection issues
- `AUTH_ERROR`: Authentication failures (401, 403)
- `VALIDATION_ERROR`: Invalid input (400-499)
- `SERVER_ERROR`: Server issues (500-599)
- `NOT_FOUND`: Resource not found (404)
- `UNKNOWN_ERROR`: Uncategorized errors

---

## Testing Error Handling

### Test Network Errors
1. Turn off internet connection
2. Try loading a page
3. Should see "Network error" toast

### Test 404 Errors
1. Navigate to invalid product ID
2. Should see "Resource not found" toast

### Test Component Errors
1. Throw an error in a component
2. Should see Error Boundary fallback UI

---

## Future Enhancements

Consider adding:

1. **Error Tracking Service** (e.g., Sentry)
2. **Offline Support** with service workers
3. **Request Cancellation** for pending requests
4. **Rate Limiting** protection
5. **Analytics** for error tracking

---

## Support

For questions or issues with error handling, contact the development team.
