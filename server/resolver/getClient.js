import { Client } from "genius-lyrics";

export const getLyrics = async () => {
  try {
    const client = new Client();

    const searches = await client.songs.search("illenium");

    const song = searches[0];

    const lyrics = await song?.lyrics();

    console.log(song.title);

    return [{ title: song?.title }];
  } catch (error) {
    console.log(error);
  }
};
