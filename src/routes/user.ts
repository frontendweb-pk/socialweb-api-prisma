import { Router } from "express";
import { getUsers, loggedInUser } from "../controllers/user";
import { auth } from "../middleware/auth";
import { authorize } from "../middleware/authorize";
import { RoleEnum } from "../utils/enum";
import { PostPermissions, UserPermissions } from "../constants/permissions";

const route: Router = Router();

/**
 * Get all user
 * Access: Admin, SuperAdmin
 *
 */
route.get("/all", auth, authorize([]), getUsers);

/**
 * Get logged in user
 * Access: user
 */
route.get(
  "/me",
  auth,
  authorize([RoleEnum.USER, RoleEnum.ADMIN], UserPermissions.READ),
  loggedInUser
);
export { route as userRoute };
