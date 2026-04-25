import { Router } from "express";
import { KategoriController } from "../controllers/kategori.controller";
import auth from "../middlewares/auth.middleware";

const router: Router = Router();

router.get("/", KategoriController.getAll);
router.post("/", auth,KategoriController.create);
router.put("/:id", auth, KategoriController.update);
router.delete("/:id", auth, KategoriController.delete);

export default router;