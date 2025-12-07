import { useState, useCallback } from "react";
import { AxiosError } from "axios";
import { LyricsService } from "@/services";
import { ERROR_MESSAGES, ERROR_CODES } from "@/constants";
import type { LyricsResponse } from "@/types";

interface UseLyricsReturn {
  lyrics: LyricsResponse | null;
  loading: boolean;
  error: string | null;
  fetchLyrics: (artist: string, title: string) => Promise<void>;
  clearLyrics: () => void;
}

export const useLyrics = (): UseLyricsReturn => {
  const [lyrics, setLyrics] = useState<LyricsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLyrics = useCallback(async (artist: string, title: string) => {
    // Reset state
    setLoading(true);
    setError(null);
    setLyrics(null);

    try {
      const result = await LyricsService.fetchLyrics(artist, title);
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
  // First, check if it's the actual error message from the API
  if (error.message) {
    return error.message;
  }

  // Then check for Axios-specific errors
  if (error instanceof AxiosError) {
    if (error.code === ERROR_CODES.TIMEOUT) {
      return ERROR_MESSAGES.TIMEOUT;
    }
    if (error.code === ERROR_CODES.NETWORK_ERROR) {
      return ERROR_MESSAGES.NETWORK_ERROR;
    }
  }

  return ERROR_MESSAGES.UNKNOWN_ERROR;
}
