export const typeDefs = `
    type lyrics {
        id: ID!,
        title:String!,
    }

    type Query {
        getLyrics: [lyrics],
    }`;
