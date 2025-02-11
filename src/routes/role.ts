import { Router } from "express";
import {
  createRole,
  deleteRole,
  getRoles,
  updateRole,
} from "../controllers/role";
import { body, param } from "express-validator";
import { requestValidator } from "../middleware/request-validator";
import { auth } from "../middleware/auth";
import { authorize } from "../middleware/authorize";

const router: Router = Router();

/**
 * Get all roles
 * method:    GET
 * Access:    Admin
 *
 */
router.get("/all", auth, authorize("all:permission"), getRoles);

/**
 * Add new role
 */
router.post(
  "/",
  [body("role_name", "Role name is required!").notEmpty()],
  requestValidator,
  auth,
  authorize("all:permission"),
  createRole
);

router.put(
  "/:role_id",
  [param("role_id", "role_id parameter is required").isInt()],
  requestValidator,
  auth,
  authorize("all:permission"),
  updateRole
);

router.delete(
  "/:role_id",
  [param("role_id", "role_id parameter is required").isInt()],
  requestValidator,
  auth,
  authorize("all:permission"),
  deleteRole
);

export { router as roleRouter };
