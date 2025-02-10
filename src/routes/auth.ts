import express, { Router } from "express";
import { signUp } from "../controllers/auth";
import { body } from "express-validator";
import { regex } from "../lib/regex";
import { BadRequestError } from "../lib/errors";
import { requestValidator } from "../middleware/validator";

const route: Router = express.Router();

const signupSchema = [
  body("name", "Name is required!").notEmpty(),
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
  body("mobile", "Mobile is required!")
    .notEmpty()
    .custom((value) => {
      const valid = regex.mobile.test(value);
      if (!valid)
        throw new BadRequestError(
          "Mobile number must be a valid Indian mobile number starting with 6-9 and followed by 9 digits."
        );
      return true;
    }),
];

route.post("/signup", signupSchema, requestValidator, signUp);

export { route as authRoute };
