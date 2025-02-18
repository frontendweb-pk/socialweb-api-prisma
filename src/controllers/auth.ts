import { Request, Response, NextFunction } from "express";
import { createNewUser, login } from "../services/auth";
import { generateAccessToken, generateRefreshToken } from "../lib/jwt-jose";
import prisma from "../lib/prisma-client";

declare module "express-session" {
  interface Session {
    user: {
      email: string;
      user_id: number;
      role_id: number;
      role_name: string;
      is_authenticated: boolean;
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

    const expireAt = Date.now() + 5 * 60 * 1000;
    const token = await generateAccessToken(
      {
        user_id: user.user_id,
        role: user.role.role_name,
        role_id: user.role.role_id,
      },
      expireAt // 5 minutes
    );

    user.access_token = token;

    await prisma.user.update({
      where: { user_id: user.user_id },
      data: { access_token: token },
    });

    // res.cookie("refreshToken", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   maxAge: 5 * 60 * 1000, // 5 minutes
    //   path: "/",
    //   sameSite: "lax",
    // });

    // req.session.user = {
    //   email: user.email,
    //   user_id: user.user_id,
    //   role_id: user.role.role_id,
    //   role_name: user.role.role_name as string,
    //   is_authenticated: true,
    // };

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
const verifyMe = async (req: Request, res: Response, next: NextFunction) => {};

/**
 * Refresh toke
 * @param req
 * @param res
 * @param next
 */
const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {}
};
// app.post('/refresh-token', async (req, res) => {
//   const { refreshToken } = req.cookies;
//   if (!refreshToken) {
//     return res.status(401).json({ message: 'Refresh token missing or invalid' });
//   }
//   try {
//     const payload = jwt.verify(refreshToken, REFRESH_SECRET_KEY);
//     const accessToken = generateAccessToken(payload.userId);
//     res.cookie('accessToken', accessToken, { httpOnly: true, secure: true });
//     res.json({ accessToken });
//   } catch (error) {
//     res.status(401).json({ message: 'Refresh token invalid or expired' });
//   }
// });

export { signIn, signUp, verifyMe };
