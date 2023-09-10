import { Redis } from "ioredis";

import * as dotenv from "dotenv";

dotenv.config({ path: "config/.env" });

const getRedisUrl = () => {
  if (process.env.REDIS_URL) {
    return process.env.REDIS_URL;
  }

  throw new Error("Redis Url not defined");
};

export const redis = new Redis(getRedisUrl());
