import { logger } from "../lib/logger";
import { QueryString } from "../types";

export const dev = (msg: string, value?: string | QueryString) => {
  if (process.env.NODE_ENV === "development") {
    logger.info(msg, value, { timestamp: new Date() });
  }
};
