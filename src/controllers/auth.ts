import { Request, Response, NextFunction } from "express";
import { createNewUser, login } from "../services/auth";

declare module "express-session" {
  interface Session {
    user: {
      email: string;
      role: string;
      user_id: number;
    };
  }
}

/**
 * Register new user
 * @param req
 * @param res
 * @param next
 */
const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, role_id = 2, mobile } = req.body;

    const user = await createNewUser({
      name,
      email,
      role_id,
      password,
      mobile,
    });

    res.status(201).send(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**
 * Sign in user
 * @param req
 * @param res
 * @param next
 */
const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await login({ email, password });

    req.session.user = {
      email: user.email,
      user_id: user.user_id,
      role: user.role.role_name as string,
    };

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
const verifyMe = async (req: Request, res: Response, next: NextFunction) => {};

export { signIn, signUp, verifyMe };
