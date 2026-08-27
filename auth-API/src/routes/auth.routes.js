import router from "express";
import * as authController from "../controller/auth.controller.js";

const authRouter = router();

authRouter.post("/register", authController.register);
authRouter.get("/user", authController.getUser);

export default authRouter;
