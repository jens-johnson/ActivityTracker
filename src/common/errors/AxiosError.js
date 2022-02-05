/**
 * Custom error codes for Axios errors
 */
const CODES = {
  UNKNOWN: 'UNKNOWN',
  INVALID_REQUEST: 'INVALID_REQUEST',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN'
};

/**
 * Custom error class describing errors for Axios operations
 */
class AxiosError extends Error {
  /**
   * Creates an instance of an AxiosError with optional params
   *
   * @param {string} message - A readable message describing the error
   * @param {string} endpoint - The URL for the endpoint that generated the error; optional
   * @param {string} method - The HTTP method used by Axios when the error was generated, if any; optional
   * @param {string} code - An enumeration of custom Axios error codes to describe the error; optional
   * @param {Error} error - The native error object that generated the error; optional
   * @return {AxiosError}
   */
  constructor(message, { endpoint=undefined, method=undefined, code=undefined, error=undefined }) {
    super(message);
    this.endpoint = endpoint;
    this.method = method;
    this.code = code;
    this.error = error;
  }
}

export {
  AxiosError,
  CODES
};
