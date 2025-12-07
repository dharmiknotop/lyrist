/**
 * Query to fetch lyrics for a song
 */
export const GET_LYRICS_QUERY = `
  query GetLyrics($artist: String!, $title: String!) {
    getLyrics(artist: $artist, title: $title) {
      lyrics
      title
      artist
      error
    }
  }
`;
