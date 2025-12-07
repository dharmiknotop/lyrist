import { apiClient, API_URL } from "./api.service";
import { GET_LYRICS_QUERY } from "@/constants";
import type { LyricsResponse, GraphQLResponse } from "@/types";

/**
 * LyricsService - Handles all lyrics-related API operations
 */
class LyricsService {
  async fetchLyrics(artist: string, title: string): Promise<LyricsResponse> {
    try {
      const { data } = await apiClient.post<GraphQLResponse<LyricsResponse>>(
        API_URL,
        {
          query: GET_LYRICS_QUERY,
          variables: { artist, title },
        }
      );

      // Handle GraphQL errors
      if (data.errors && data.errors.length > 0) {
        throw new Error(data.errors[0].message);
      }

      // Handle application-level errors
      if (data.data.getLyrics.error) {
        throw new Error(data.data.getLyrics.error);
      }

      return data.data.getLyrics;
    } catch (error: any) {
      // Preserve the original error message from the server
      const errorMessage =
        error.response?.data?.errors?.[0]?.message ||
        error.message ||
        "Failed to fetch lyrics";

      throw new Error(errorMessage);
    }
  }
}

// Export singleton instance
export default new LyricsService();
