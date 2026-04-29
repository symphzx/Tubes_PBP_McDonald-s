import { Router } from "express";
import { OpsiMenuController } from "../controllers/opsi_menu.controller";
import auth from "../middlewares/auth.middleware";

const router: Router = Router();

router.post("/", auth, OpsiMenuController.create);
router.put("/:id", auth, OpsiMenuController.update);
router.delete("/:id", auth, OpsiMenuController.delete);

export default router;