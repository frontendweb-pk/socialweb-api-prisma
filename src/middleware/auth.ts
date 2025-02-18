import { Request, Response, NextFunction } from "express";
import { AuthError } from "../lib/errors";
import { logger } from "../lib/logger";
import { AuthPayload, verifyAccessToken } from "../lib/jwt-jose";

export async function auth(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    logger.warn(
      `Unauthorized access! attempt at ${req.originalUrl} from IP: ${req.ip}`
    );
    throw new AuthError("Unauthorized access! You must be logged in.");
  }

  try {
    const token = authToken.split(" ")[1];
    const isValid = await verifyAccessToken(token);
    if (!isValid) {
      logger.warn(
        `Unauthorized access! attempt at ${req.originalUrl} from IP: ${req.ip}`
      );
      throw new AuthError("Unauthorized access! You must be logged in.");
    }
    req.user = isValid as AuthPayload;
    next();
  } catch (error) {
    next(error);
  }
}
