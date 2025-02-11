import prisma from "../lib/prisma-client";
import { AuthError, BadRequestError } from "../lib/errors";
import { Password } from "../lib/password";

interface RegisterUser {
  name: string;
  email: string;
  password: string;
  role_id: number;
  mobile: string;
}

/**
 * Check user is exist
 * @param email
 */
export const userExist = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user) {
    throw new BadRequestError(
      `${email} already associated with us, please use another.`
    );
  }
  return user;
};

/**
 * Create new user
 * @param body
 */
export const createNewUser = async (body: RegisterUser) => {
  const { name, email, password, role_id, mobile } = body;

  await userExist(email); // has user, throw error

  console.log(body, "-----------");
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

  return user;
};

/**
 * Login service
 * @param param0
 * @returns
 */
export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  // if user
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      user_id: true,
      name: true,
      email: true,
      password: true,
      mobile: true,
      avatar: true,
      email_verified: true,
      role: {
        select: {
          role_id: true,
          role_name: true,
          permissions: true,
        },
      },
    },
  });

  if (!user) throw new BadRequestError("User not found, please register");

  // password verification
  const isMatch = await Password.compare(password, user.password);
  if (!isMatch) throw new AuthError("Invalid password");

  const { password: _, ...rest } = user;

  return rest;
};
