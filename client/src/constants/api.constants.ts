/**
 * API Configuration Constants
 */

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000",
  GRAPHQL_ENDPOINT: "/graphql",
  TIMEOUT: 15000,
} as const;

export const GRAPHQL_URL = `${API_CONFIG.BASE_URL}${API_CONFIG.GRAPHQL_ENDPOINT}`;
