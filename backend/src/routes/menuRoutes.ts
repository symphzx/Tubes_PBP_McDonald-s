
import { Router } from "express";
import { MenuController } from "../controllers/MenuController";

const router: Router = Router();

router.get("/", MenuController.getAll);

export default router;