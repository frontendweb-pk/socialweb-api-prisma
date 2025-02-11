import { Router } from "express";
import { changePassword, getUsers, loggedInUser } from "../controllers/user";
import { auth } from "../middleware/auth";
import { authorize } from "../middleware/authorize";
import { UserPermissions } from "../constants/permissions";
import { body } from "express-validator";
import { BadRequestError } from "../lib/errors";
import { regex } from "../lib/regex";
import { requestValidator } from "../middleware/request-validator";

const router: Router = Router();

/**
 * Get all user
 * Access: Admin, SuperAdmin
 *
 */
router.get("/all", auth, authorize("all:permission"), getUsers);
/**
 * Get logged in user
 * Access: user
 */
router.get("/me", auth, authorize(UserPermissions.READ), loggedInUser);
router.put(
  "/change-password",
  auth,
  authorize("user:change_password"),
  [
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
  changePassword
);
export { router as userRouter };
