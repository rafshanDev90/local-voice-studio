import router from "express";
import * as authController from "../controller/auth.controller.js";

const authRouter = router();
authRouter.post("/register", authController.register);

export default authRouter;
