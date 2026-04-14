import { Router } from "express";
import { KategoriController } from "../controllers/KategoriController";

const router: Router = Router();

router.get("/", KategoriController.getAll);

export default router;