/**
 * Type definitions for Lyrics feature
 */

/**
 * Response from the GraphQL getLyrics query
 */
export interface LyricsResponse {
  lyrics: string | null;
  title?: string;
  artist?: string;
  error?: string;
}

/**
 * GraphQL API response wrapper
 */
export interface GraphQLResponse<T> {
  data: {
    getLyrics: T;
  };
  errors?: Array<{
    message: string;
    extensions?: Record<string, any>;
  }>;
}

/**
 * Props for Lyrics display component
 */
export interface LyricsProps {
  loading: boolean;
  lyrics: string | null;
  title?: string;
  artist?: string;
  loadingMessage?: string;
}

/**
 * Props for LyricsForm component
 */
export interface LyricsFormProps {
  onSubmit?: (query: string) => void;
  className?: string;
}

/**
 * Search query parameters
 */
export interface SearchQuery {
  track: string;
  artist?: string;
}
