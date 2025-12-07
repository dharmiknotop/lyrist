import LyricsService from "../services/LyricsService.js";
import CacheService from "../services/CacheService.js";

export const getLyrics = async ({ artist, title }) => {
  try {
    console.log(`Fetching lyrics for: "${artist} - ${title}"`);

    const name = `lyrics_${artist.trim().toLowerCase()}_${title
      .trim()
      .toLowerCase()}`;

    const cachedLyrics = await CacheService.get(name);

    if (cachedLyrics) {
      console.log("Cache hit! Returning cached lyrics");
      return {
        lyrics: cachedLyrics,
        title: title,
        artist: artist,
      };
    }

    const result = await LyricsService.getLyrics(artist, title);

    if (result.lyrics) {
      await CacheService.set(name, result.lyrics);
    }

    return result;
  } catch (error) {
    console.error("getLyrics resolver error:", error.message);

    // Return the actual error message from the service
    return {
      error: error.message || "Failed to fetch lyrics. Please try again later.",
    };
  }
};
