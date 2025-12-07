import axios from "axios";

class LyricsService {
  constructor() {
    this.apiBaseUrl = "https://api.lyrics.ovh/v1";
  }

  async getLyrics(artist, title) {
    console.log(`Fetching lyrics for: "${artist} - ${title}"`);

    try {
      // Validate required parameters
      if (!artist || !artist.trim()) {
        throw new Error("Artist name is required");
      }

      if (!title || !title.trim()) {
        throw new Error("Song title is required");
      }

      artist = artist.trim();
      title = title.trim();

      console.log(`Searching: artist="${artist}", title="${title}"`);

      // Call Lyrics.ovh API
      const url = `${this.apiBaseUrl}/${encodeURIComponent(
        artist
      )}/${encodeURIComponent(title)}`;
      console.log(`API URL: ${url}`);

      const response = await axios.get(url, {
        timeout: 10000,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.data || !response.data.lyrics) {
        throw new Error("No lyrics found for the given query");
      }

      const lyrics = response.data.lyrics.trim();
      console.log(`Successfully fetched lyrics (${lyrics.length} chars)`);

      return {
        lyrics,
        title,
        artist,
      };
    } catch (error) {
      console.error("Error fetching lyrics:", error.message);

      if (error.response?.status === 404) {
        throw new Error("Song not found. Try a different artist or title.");
      }

      throw new Error(error.message || "Failed to fetch lyrics");
    }
  }
}

export default new LyricsService();
