import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import auth from "../middlewares/auth.middleware";

const router: Router = Router();

router.post("/login", AuthController.login);
router.post("/logout", auth, AuthController.logout);
router.get("/me", auth, AuthController.me);
router.post("/forgot-password", AuthController.forgotPassword);
router.post("/reset-password", AuthController.resetPassword);

export default router;
