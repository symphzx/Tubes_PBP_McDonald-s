import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import auth from "../middlewares/auth.middleware";
import { validateCreateUser, validateUpdateUser } from "../middlewares/user.validation.middleware";
import { userExist } from "../middlewares/userExist";

const router: Router = Router();

router.get("/", auth, UserController.getAll);
router.get("/:id", auth, userExist, UserController.getById);
router.post("/", auth, validateCreateUser, UserController.create);
router.put("/:id", auth, validateUpdateUser, userExist, UserController.update);
router.delete("/:id", auth, userExist, UserController.delete);

export default router;
