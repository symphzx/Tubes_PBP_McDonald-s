import { Router } from "express";
import { VarianMenuController } from "../controllers/varian_menu.controller";
import auth from "../middlewares/auth.middleware";

const router: Router = Router();

router.post("/", auth, VarianMenuController.create);
router.put("/:id", auth, VarianMenuController.update);
router.delete("/:id", auth, VarianMenuController.delete);

export default router;