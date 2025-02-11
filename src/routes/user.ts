import { Router } from "express";
import { getUsers, loggedInUser } from "../controllers/user";
import { auth } from "../middleware/auth";
import { authorize } from "../middleware/authorize";
import { RoleEnum } from "../utils/enum";

const route: Router = Router();

/**
 * Get all user
 * Access: Admin, SuperAdmin
 *
 */
route.get(
  "/all",
  auth,
  authorize(["all:permission"], [RoleEnum.ADMIN]),
  getUsers
);

/**
 * Get logged in user
 * Access: user
 */
route.get(
  "/me",
  auth,
  authorize(["user:read", "user:update"], [RoleEnum.USER]),
  loggedInUser
);
export { route as userRoute };
