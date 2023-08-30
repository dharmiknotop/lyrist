import { Client } from "genius-lyrics";

export const getLyrics = async (name) => {
  try {
    const client = new Client();

    const searches = await client.songs.search(name);

    const song = searches[0];

    const lyrics = await song?.lyrics();

    console.log(song.title);

    return [{ lyrics: lyrics, title: song?.title, artist: song?.artist.name }];
  } catch (error) {
    console.log(error);
  }
};
