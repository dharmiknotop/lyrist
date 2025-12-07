/**
 * Error messages used throughout the application
 */

export const ERROR_MESSAGES = {
  TIMEOUT: "Request timed out. The server might be slow or down.",
  FETCH_FAILED: "Failed to fetch lyrics. Please try again.",
  NETWORK_ERROR: "Network error. Please check your connection.",
  UNKNOWN_ERROR: "An unexpected error occurred. Please try again later.",
} as const;

export const ERROR_CODES = {
  TIMEOUT: "ECONNABORTED",
  NETWORK_ERROR: "ERR_NETWORK",
  CANCELLED: "ERR_CANCELED",
} as const;
