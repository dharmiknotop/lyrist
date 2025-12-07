import { useState, useCallback } from "react";
import { AxiosError } from "axios";
import { LyricsService } from "@/services";
import { ERROR_MESSAGES, ERROR_CODES } from "@/constants";
import type { LyricsResponse } from "@/types";

interface UseLyricsReturn {
  lyrics: LyricsResponse | null;
  loading: boolean;
  error: string | null;
  fetchLyrics: (track: string, artist?: string) => Promise<void>;
  clearLyrics: () => void;
}

export const useLyrics = (): UseLyricsReturn => {
  const [lyrics, setLyrics] = useState<LyricsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLyrics = useCallback(async (track: string, artist?: string) => {
    // Reset state
    setLoading(true);
    setError(null);
    setLyrics(null);

    try {
      const query = LyricsService.buildSearchQuery(track, artist);
      const result = await LyricsService.fetchLyrics(query);
      setLyrics(result);
    } catch (err: any) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      console.error("Lyrics fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearLyrics = useCallback(() => {
    setLyrics(null);
    setError(null);
  }, []);

  return {
    lyrics,
    loading,
    error,
    fetchLyrics,
    clearLyrics,
  };
};

function getErrorMessage(error: any): string {
  if (error instanceof AxiosError) {
    if (error.code === ERROR_CODES.TIMEOUT) {
      return ERROR_MESSAGES.TIMEOUT;
    }
    if (error.response?.data?.errors) {
      return ERROR_MESSAGES.FETCH_FAILED;
    }
    if (error.code === ERROR_CODES.NETWORK_ERROR) {
      return ERROR_MESSAGES.NETWORK_ERROR;
    }
  }

  return error.message || ERROR_MESSAGES.UNKNOWN_ERROR;
}
