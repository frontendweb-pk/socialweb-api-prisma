import { Router } from "express";

import {
  createPermission,
  createPermissions,
  deletePermission,
  getAllPermission,
} from "../controllers/permission";
import { auth } from "../middleware/auth";
import { authorize } from "../middleware/authorize";

const router: Router = Router();

router.get("/all", auth, authorize("all:permission"), getAllPermission);
router.post("/", auth, authorize("all:permission"), createPermission);
router.post("/bulk", auth, authorize("all:permission"), createPermissions);
router.delete(
  "/:permission_id",
  auth,
  authorize("all:permission"),
  deletePermission,
);

export { router as permissionRouter };
