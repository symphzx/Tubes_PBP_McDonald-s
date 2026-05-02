
import { Router } from "express";
import { MenuController } from "../controllers/menu.controller";
import upload from "../middlewares/upload";
import auth from "../middlewares/auth.middleware";
import { validateMenu } from "../middlewares/menu.validation.middleware";
import { menuExist } from "../middlewares/menuExist";

const router: Router = Router();

router.get("/", MenuController.getAll);
router.get("/:id", menuExist, MenuController.getById);
router.post("/", auth, upload.single("gambar"), validateMenu, MenuController.create);
router.put("/:id", auth, upload.single("gambar"), validateMenu, menuExist, MenuController.update);
router.delete("/:id", auth, menuExist, MenuController.delete);

export default router;