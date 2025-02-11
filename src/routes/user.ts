import { Router } from "express";
import { getUsers } from "../controllers/user";
import { isAuth } from "../middleware/auth";

const route: Router = Router();

route.get("/all", isAuth, getUsers);

export { route as userRoute };
