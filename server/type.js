export const typeDefs = `
    type lyrics {
        lyrics: String,
        title: String,
        artist: String,
        error: String,
    }

    type Query {
        getLyrics(artist: String!, title: String!): lyrics,
    }`;
