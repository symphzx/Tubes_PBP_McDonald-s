
import { Router } from "express";
import { MenuController } from "../controllers/MenuController";
import upload from "../middlewares/upload";

const router: Router = Router();

router.get("/", MenuController.getAll);
router.post("/", upload.single("gambar"), MenuController.create);

export default router;