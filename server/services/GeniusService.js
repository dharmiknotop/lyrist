import { Client } from "genius-lyrics";
import axios from "axios";
import * as cheerio from "cheerio";
import * as dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "config/.env" });
}

class GeniusService {
  constructor() {
    const token = process.env.GENIUS_API_TOKEN;

    console.log("GeniusService: Initializing Genius API client...");
    console.log(token);

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
    console.log(`Fetching lyrics from Genius API for: "${query}"`);
    console.log(`Using token: ${process.env.GENIUS_API_TOKEN ? "YES" : "NO"}`);

    console.log(`Searching for "${query}"...`);
    const results = await this.client.songs.search(query);

    console.log(`Search returned ${results?.length || 0} results`);

    if (!results || results.length === 0) {
      throw new Error("No song found for the given query");
    }

    const song = results[0];
    console.log(`Found song: "${song.title}" by ${song.artist?.name}`);
    console.log(`Song URL: ${song.url}`);

    // Fetch lyrics by scraping the Genius page
    const page = await axios.get(song.url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
          "(KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      timeout: 15000,
    });

    const $ = cheerio.load(page.data);

    let lyrics = "";
    $('div[data-lyrics-container="true"]').each((_, elem) => {
      if ($(elem).text().length !== 0) {
        const snippet = $(elem)
          .html()
          .replace(/<br>/g, "\n")
          .replace(/<(?!\s*br\s*\/?)[^>]+>/gi, "");
        lyrics += $("<textarea/>").html(snippet).text().trim() + "\n\n";
      }
    });

    lyrics = lyrics.trim();

    if (!lyrics) {
      throw new Error("Could not parse lyrics from Genius page");
    }

    console.log(`Successfully fetched lyrics (${lyrics.length} chars)`);

    return {
      lyrics,
      title: song.title,
      artist: song.artist?.name || "Unknown Artist",
    };
  }
}

export default new GeniusService();
