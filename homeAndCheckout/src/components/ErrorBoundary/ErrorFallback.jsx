import PropTypes from 'prop-types';
import './styles.scss';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <div className="error-boundary">
      <div className="error-boundary-content">
        <h1>Oops! Something went wrong</h1>
        <p className="error-message">
          We're sorry for the inconvenience. The application encountered an unexpected error.
        </p>

        {isDevelopment && error && (
          <details className="error-details">
            <summary>Error Details (Development Only)</summary>
            <pre>{error.toString()}</pre>
            {error.stack && (
              <pre>{error.stack}</pre>
            )}
          </details>
        )}

        <div className="error-actions">
          <button onClick={resetErrorBoundary} className="retry-button">
            Try Again
          </button>
          <button
            onClick={() => (window.location.href = '/')}
            className="home-button"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

ErrorFallback.propTypes = {
  error: PropTypes.object,
  resetErrorBoundary: PropTypes.func.isRequired,
};

export default ErrorFallback;
