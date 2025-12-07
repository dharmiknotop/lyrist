export const typeDefs = `
    type lyrics {
        lyrics: String,
        title: String,
        artist: String,
        error: String,
    }

    type Query {
        getLyrics(name : String!): lyrics,
    }`;
