import GeniusService from "../services/GeniusService.js";
import CacheService from "../services/CacheService.js";

export const getLyrics = async (name) => {
  try {
    const cachedLyrics = await CacheService.get(name);

    if (cachedLyrics) {
      return { lyrics: cachedLyrics };
    }

    console.log(`Fetching lyrics from Genius API for: "${name}"`);

    const result = await GeniusService.getLyrics(name);

    if (result.lyrics) {
      await CacheService.set(name, result.lyrics);
    }

    return result;
  } catch (error) {
    console.error("getLyrics resolver error:", error.message);

    // Return user-friendly error messages based on error type
    if (error.message?.includes("No song found")) {
      return {
        error: "No lyrics found for this song. Try a different search.",
      };
    }

    if (error.message?.includes("timeout")) {
      return {
        error: "Request timed out. Please try again.",
      };
    }

    return {
      error: "Failed to fetch lyrics. Please try again later.",
    };
  }
};
