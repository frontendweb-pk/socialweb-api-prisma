import { createClient } from "redis";
import { RedisStore } from "connect-redis";
import { config } from "../config";
import { logger } from "./logger";

const redisClient = createClient({
  url: config.redisUrl,
});

redisClient.on("connected", () => {
  logger.info("Redis connected!");
});

redisClient.connect().catch(console.error);

let redisStore = new RedisStore({
  client: redisClient,
  prefix: config.sessionPrefix,
}); // Adjust Redis connection as needed

export { redisStore };
