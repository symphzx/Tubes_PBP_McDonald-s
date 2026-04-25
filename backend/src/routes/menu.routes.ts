
import { Router } from "express";
import { MenuController } from "../controllers/menu.controller";
import upload from "../middlewares/upload";
import auth from "../middlewares/auth.middleware";

const router: Router = Router();

router.get("/", MenuController.getAll);
router.post("/", auth, upload.single("gambar"), MenuController.create);
router.put("/:id", auth, upload.single("gambar"), MenuController.update);
router.delete("/:id", auth, MenuController.delete);

export default router;