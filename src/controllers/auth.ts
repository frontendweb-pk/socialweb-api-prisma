import { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma-client";
import { BadRequestError } from "../lib/errors";
import { Password } from "../lib/password";

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

const signIn = async (req: Request, res: Response, next: NextFunction) => {};
const verifyMe = async (req: Request, res: Response, next: NextFunction) => {};

export { signIn, signUp, verifyMe };
