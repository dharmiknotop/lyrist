import * as dotenv from "dotenv";

dotenv.config({ path: "config/.env" });

import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import bodyParser from "body-parser";
import cors from "cors";

import { typeDefs } from "./type.js";
import { getLyrics } from "./resolver/getLyrics.js";

async function startServer() {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers: {
      Query: {
        getLyrics: (_, { name }) => {
          return getLyrics(name);
        },
      },
    },
  });
  await apolloServer.start();

  app.use("/graphql", expressMiddleware(apolloServer));

  const server = app.listen(8000, () => {
    console.log(
      `🚀 Server ready at http://localhost:8000${apolloServer.graphqlPath}`
    );
  });
  return server;
}

startServer();
