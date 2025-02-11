import { Request, Response, NextFunction } from "express";
import { userService } from "../services/user";
import prisma from "../lib/prisma-client";
import { Password } from "../lib/password";

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
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

/**
 * Logged in user
 * @param req
 * @param res
 * @param next
 */
export const loggedInUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_id = req.session.user.user_id;
    const user = await userService.getLoggedInUser(user_id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password } = req.body;
    await userService.updatePassword(req.session.user.user_id, password);
    res.status(200).json({ user_id: req.session.user.user_id });
  } catch (error) {
    next(error);
  }
};
