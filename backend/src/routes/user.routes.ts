import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import auth from "../middlewares/auth.middleware";

const router: Router = Router();

router.get("/", auth, UserController.getAll);
router.get("/:id", auth, UserController.getById);
router.post("/", UserController.create);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.delete);

export default router;
