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

const router: Router = Router();

router.get("/all", auth, getRoles);

router.post(
  "/",
  [body("role_name", "Role name is required!").notEmpty()],
  requestValidator,
  auth,
  createRole
);

router.put(
  "/:role_id",
  [param("role_id", "role_id parameter is required").isInt()],
  requestValidator,
  updateRole
);

router.delete(
  "/:role_id",
  [param("role_id", "role_id parameter is required").isInt()],
  requestValidator,
  deleteRole
);

export { router as roleRouter };
