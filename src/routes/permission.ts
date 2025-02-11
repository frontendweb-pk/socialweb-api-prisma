import { Router } from "express";
import { createPermission, getAllPermission } from "../controllers/permission";
import { auth } from "../middleware/auth";
import { authorize } from "../middleware/authorize";

const router: Router = Router();

router.get("/", auth, authorize(), getAllPermission);

router.post("/", auth, authorize(), createPermission);

export { router as permissionRouter };
