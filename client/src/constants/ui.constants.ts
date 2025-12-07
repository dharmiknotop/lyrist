/**
 * UI Constants and Configuration
 */

/**
 * Theme colors for the application
 */
export const THEME_COLORS = {
  PRIMARY: "cyan",
  SECONDARY: "gray",
  BACKGROUND: "zinc-800",
  TEXT_PRIMARY: "white",
  TEXT_SECONDARY: "gray-400",
} as const;

/**
 * Form input styling configuration
 */
export const INPUT_STYLES = {
  LABEL_COLOR: "cyan",
  VARIANT: "outlined" as const,
  TEXT_COLOR: "text-white",
};

/**
 * Loading messages displayed to users
 */
export const LOADING_MESSAGES = {
  FETCHING: "Searching for your song...",
  SCRAPING: "Fetching lyrics...",
  PATIENCE: "This might take a moment (up to 10 seconds)",
  ALMOST_THERE: "Still working on it...",
  PLEASE_WAIT: "Fetching lyrics, please wait...",
} as const;

/**
 * Placeholder messages
 */
export const PLACEHOLDERS = {
  EMPTY_STATE: "Your lyrics will be shown here...",
  NO_LYRICS_FOUND: "Sorry, no lyrics found",
  ARTIST_LABEL: "Artist name (optional)",
  TRACK_LABEL: "Track name",
} as const;

/**
 * Button labels
 */
export const BUTTON_LABELS = {
  SEARCH: "Search",
  SEARCHING: "Searching...",
} as const;
