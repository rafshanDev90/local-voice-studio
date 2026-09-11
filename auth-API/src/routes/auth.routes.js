import router from "express";
import * as authController from "../controller/auth.controller.js";
import { authLimiter } from "../config/rateLimitor.js";
import { validateRegister } from "../config/validation.js";

const authRouter = router();

authRouter.post("/register", authLimiter, validateRegister, authController.register);
authRouter.get("/me", authLimiter, authController.getMe);
authRouter.post("/refresh", authLimiter, authController.refreshToken);
authRouter.post("/logout", authController.logout);
export default authRouter;
