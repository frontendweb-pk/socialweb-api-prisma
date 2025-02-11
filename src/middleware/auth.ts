import { Request, Response, NextFunction } from "express";
import { AuthError } from "../lib/errors";
import { logger } from "../lib/logger";

export function isAuth(req: Request, res: Response, next: NextFunction) {
  const session = req.session.user;
  try {
    if (!session) {
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
