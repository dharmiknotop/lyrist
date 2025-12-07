/**
 * String utility functions
 */

/**
 * Capitalizes the first letter of a string
 */
export const capitalize = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Truncates a string to a specified length
 */
export const truncate = (str: string, maxLength: number): string => {
  if (!str || str.length <= maxLength) return str;
  return `${str.slice(0, maxLength)}...`;
};

/**
 * Removes extra whitespace and trims a string
 */
export const cleanString = (str: string): string => {
  if (!str) return "";
  return str.replace(/\s+/g, " ").trim();
};
