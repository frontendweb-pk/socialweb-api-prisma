import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { RequestValidator } from "../lib/errors";

export function requestValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    throw new RequestValidator(result.array());
  }

  next();
}
