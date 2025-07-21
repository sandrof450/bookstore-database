import { Router } from "express";

import UserController from "../controllers/user-controller";
import ensureAuthentication from "../middlewares/ensure-authentication";

// import { createUser } from "../controllers/user-controller";

const userRouter = Router();

// userRouter.post("/api/users", createUser)
userRouter.post("/api/users", UserController.createUser);

userRouter.use(ensureAuthentication);
userRouter.get("/api/users", UserController.listUsers);

export default userRouter;
