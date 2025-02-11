import { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma-client";

/**
 * Get all users for admin
 * @param req
 * @param res
 * @param next
 */
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await prisma.user.findMany({
      omit: {
        password: true,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
