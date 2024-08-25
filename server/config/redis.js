import { Redis } from "@upstash/redis";

import * as dotenv from "dotenv";

dotenv.config({ path: "config/.env" });

export const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN,
});
