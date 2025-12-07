/**
 * Query to fetch lyrics for a song
 */
export const GET_LYRICS_QUERY = `
  query GetLyrics($name: String!) {
    getLyrics(name: $name) {
      lyrics
      title
      artist
      error
    }
  }
`;
