import * as dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "config/.env" });
}

import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import bodyParser from "body-parser";
import cors from "cors";

import { typeDefs } from "./type.js";
import { getLyrics } from "./resolver/getLyrics.js";

async function startServer() {
  try {
    const app = express();

    app.use(cors());
    app.use(bodyParser.json());

    // Request logging middleware
    app.use((req, res, next) => {
      console.log(`📥 ${req.method} ${req.path}`);
      next();
    });

    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers: {
        Query: {
          getLyrics: (_, args) => {
            return getLyrics(args);
          },
        },
      },
    });
    await apolloServer.start();

    app.use("/graphql", expressMiddleware(apolloServer));

    const PORT = process.env.PORT || 8000;
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    });
    return server;
  } catch (error) {
    console.log(error);
  }
}

startServer();
