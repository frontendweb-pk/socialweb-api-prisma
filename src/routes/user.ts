import { Router } from "express";
import { getUsers, loggedInUser } from "../controllers/user";
import { isAuth } from "../middleware/auth";
import { authorize } from "../middleware/authorize";

const route: Router = Router();

/**
 * Get all user
 * Access: Admin, SuperAdmin
 *
 */
route.get("/all", isAuth, authorize(["all:permission"], "ADMIN"), getUsers);

/**
 * Get logged in user
 * Access: user
 */
route.get(
  "/me",
  isAuth,
  authorize(["user:read", "user:update"], "USER"),
  loggedInUser
);
export { route as userRoute };
