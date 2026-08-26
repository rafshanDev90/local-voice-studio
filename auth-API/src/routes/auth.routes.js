import router from "express";
import * as authController from "../controller/auth.controller.js";

const authRouter = router();
authRouter.post("/register", authController.register);
authRouter.get("/me", authController.getMe);
authRouter.get("/refresh", authController.refreshToken);

export default authRouter;
