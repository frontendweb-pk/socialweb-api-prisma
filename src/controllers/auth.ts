import { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma-client";
import { AuthError, BadRequestError } from "../lib/errors";
import { Password } from "../lib/password";

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
    const { name, email, password, role_id = 1, mobile } = req.body;

    const isEmail = await prisma.user.findUnique({
      where: { email: email },
    });

    if (isEmail) {
      throw new BadRequestError("Email already associated with us!");
    }

    const hasedPassword = await Password.hash(password);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hasedPassword,
        role_id,
        mobile,
      },
      omit: {
        password: true,
      },
    });

    res.status(201).send(user);
  } catch (error) {
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

    // if user
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        role: true,
      },
    });

    if (!user) throw new BadRequestError("User not found, please register");

    // password verification
    const isMatch = await Password.compare(password, user.password);
    if (!isMatch) throw new AuthError("Invalid password");

    const { password: _, ...rest } = user;

    // const token = Jwt.sign({
    //   email: user.email,
    //   user_id: user.user_id,
    //   role: user.role.role_name as string,
    // });

    req.session.user = {
      email: user.email,
      user_id: user.user_id,
      role: user.role.role_name as string,
    };

    res.status(200).json({
      // token: token,
      expireIn: 3600,
      user: rest,
    });
  } catch (error) {
    next(error);
  }
};
const verifyMe = async (req: Request, res: Response, next: NextFunction) => {};

export { signIn, signUp, verifyMe };
