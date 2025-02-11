import e, { Request, Response, NextFunction } from "express";
import { CustomError } from "../lib/errors/custom-error";

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof CustomError) {
    res.status(error.statusCode).json(error.serializeError());
    return;
  }

  res.status(500).json({
    errors: [
      {
        message: error.message,
      },
    ],
  });
}
