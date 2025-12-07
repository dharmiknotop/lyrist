/**
 * Common type definitions used across the application
 */

/**
 * API error response structure
 */
export interface ApiError {
  message: string;
  code?: string;
  statusCode?: number;
}

/**
 * Loading state for async operations
 */
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T = unknown> {
  data?: T;
  error?: ApiError;
}
