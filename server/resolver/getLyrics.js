import { redis } from "../config/redis.js";
import { Client } from "genius-lyrics";
import fetch from "node-fetch";

export const getLyrics = async (name) => {
  try {
    // trying to check if the lyrics were searched before or not for the song name with redis

    let cachedLyrics = await redis.get(name);

    if (cachedLyrics) {
      return { lyrics: cachedLyrics };
    }

    const client = new Client();

    const searches = await client.songs.search(name);

    const song = searches[0];

    const lyrics = await song?.lyrics();

    // setting the lyrics in the redis so that if user tries to search for a song with the same name
    // he will get a response way quicker

    await redis.set(name, lyrics);
    await redis.expire(name, 300); // 5min expiring time

    return { lyrics, title: song?.title, artist: song?.artist.name };
  } catch (error) {
    console.log("error in api");
    console.log(error);
  }
};
