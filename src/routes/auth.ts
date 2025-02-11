import express, { Router } from "express";
import { signIn, signUp } from "../controllers/auth";
import { body } from "express-validator";
import { regex } from "../lib/regex";
import { BadRequestError } from "../lib/errors";
import { requestValidator } from "../middleware/request-validator";
import prisma from "../lib/prisma-client";

const router: Router = express.Router();

const signupSchema = [
  body("name", "Name is required!").notEmpty(),
  body("email", "Email is required")
    .notEmpty()
    .isEmail()
    .custom(async (email) => {
      const isMobile = await prisma.user.findUnique({
        where: { email },
      });
      if (isMobile) throw new BadRequestError("Email already existed!");
      return true;
    }),
  body("password", "Password is required")
    .notEmpty()
    .custom((value) => {
      const valid = regex.password.test(value);
      if (!valid)
        throw new BadRequestError(
          "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a digit, and a special character."
        );
      return true;
    }),
  body("mobile", "Mobile is required!")
    .isLength({ min: 10, max: 10 })
    .matches(regex.mobile)
    .withMessage(
      "Mobile number must be a valid Indian mobile number starting with 6-9 and followed by 9 digits."
    )
    .custom(async (value) => {
      const isMobile = await prisma.user.findUnique({
        where: { mobile: value },
      });
      if (isMobile) throw new BadRequestError("Mobile already existed!");
      return true;
    }),
];

router.post(
  "/",
  [
    body("email", "Email is required").notEmpty().isEmail(),
    body("password", "Password is required")
      .notEmpty()
      .custom((value) => {
        const valid = regex.password.test(value);
        if (!valid)
          throw new BadRequestError(
            "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a digit, and a special character."
          );
        return true;
      }),
  ],
  requestValidator,
  signIn
);
router.post("/signup", signupSchema, requestValidator, signUp);
export { router as authRouter };
