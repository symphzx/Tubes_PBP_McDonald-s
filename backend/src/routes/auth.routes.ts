import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import auth from "../middlewares/auth.middleware";

const router: Router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/me", auth, AuthController.me);

export default router