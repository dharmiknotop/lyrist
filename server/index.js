import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import bodyParser from "body-parser";
import cors from "cors";

import { typeDefs } from "./type.js";

async function startServer() {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers: {
      Query: {
        getLyrics: () => {
          return [{ id: 1, title: "something" }];
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
