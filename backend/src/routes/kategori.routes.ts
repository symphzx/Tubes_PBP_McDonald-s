import { Router } from "express";
import { KategoriController } from "../controllers/kategori.controller";
import auth from "../middlewares/auth.middleware";
import { validateKategori } from "../middlewares/kategori.validation.middleware";
import { kategoriExist } from "../middlewares/kategoriExist";

const router: Router = Router();

router.get("/", KategoriController.getAll);
router.get("/:id", kategoriExist, KategoriController.getById)
router.post("/", auth, validateKategori, kategoriExist, KategoriController.create);
router.put("/:id", auth, validateKategori, kategoriExist, KategoriController.update);
router.delete("/:id", auth, kategoriExist, KategoriController.delete);

export default router;