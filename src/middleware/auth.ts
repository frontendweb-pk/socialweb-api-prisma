import { Request, Response, NextFunction } from "express";
import { AuthError } from "../lib/errors";
import { logger } from "../lib/logger";
import { verifyAccessToken } from "../lib/jwt-jose";

export async function auth(req: Request, res: Response, next: NextFunction) {
  const session = req.cookies["refreshToken"];

  // Cookies that have not been signed

  // Cookies that have been signed
  try {
    const isValid = await verifyAccessToken(session);
    if (!isValid) {
      logger.warn(
        `Unauthorized access! attempt at ${req.originalUrl} from IP: ${req.ip}`
      );
      throw new AuthError("Unauthorized access! You must be logged in.");
    }
    next();
  } catch (error) {
    next(error);
  }
}
