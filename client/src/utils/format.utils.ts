/**
 * Format utility functions
 */

/**
 * Formats a song title and artist for display
 */
export const formatSongDisplay = (title?: string, artist?: string): string => {
  if (!title && !artist) return "Unknown Song";
  if (!artist) return title || "";
  if (!title) return artist;
  return `${title} - ${artist}`;
};

/**
 * Formats error messages for display
 */
export const formatErrorMessage = (error: any): string => {
  if (typeof error === "string") return error;
  if (error?.message) return error.message;
  return "An unexpected error occurred";
};
