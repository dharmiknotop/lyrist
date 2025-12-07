import { Client } from "genius-lyrics";
import * as dotenv from "dotenv";

dotenv.config({ path: "config/.env" });

class GeniusService {
  constructor() {
    const token = process.env.GENIUS_API_TOKEN;

    if (token) {
      console.log(
        "✓ Genius API: Initializing with official API token (faster)"
      );
      this.client = new Client(token);
    } else {
      console.warn(
        "⚠ Genius API: No token found. Using web scraping mode (slower)"
      );
      this.client = new Client();
    }
  }

  async getLyrics(query) {
    let lastError;

    // Try genius-lyrics library (3 attempts)
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        console.log(`Attempt ${attempt}: Using genius-lyrics library...`);
        const results = await this.client.songs.search(query);

        if (!results || results.length === 0) {
          throw new Error("No song found for the given query");
        }

        const song = results[0];
        const lyrics = await song.lyrics();

        return {
          lyrics,
          title: song.title,
          artist: song.artist?.name || "Unknown Artist",
        };
      } catch (error) {
        lastError = error;
        console.error(`Attempt ${attempt} failed:`, error.message);

        if (attempt < 3) {
          const delay = 2000 * attempt;
          console.log(`Retrying in ${delay}ms...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }

    console.error("All attempts failed:", lastError.message);
    throw new Error(lastError.message || "Failed to fetch lyrics");
  }
}

export default new GeniusService();
