
import { Router } from "express";
import { MenuController } from "../controllers/MenuController";
import upload from "../middlewares/upload";

const router: Router = Router();

router.get("/", MenuController.getAll);
router.post("/", upload.single("gambar"), MenuController.create);
router.put("/:id", upload.single("gambar"), MenuController.update);
router.delete("/:id", MenuController.delete);

export default router;