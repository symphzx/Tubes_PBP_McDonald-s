import { Router } from "express";
import menuRoutes from "./menu.routes";
import varianMenuRoutes from "./varian_menu.routes";
import opsiMenuRoutes from "./opsi_menu.routes";
import authRoutes from "./auth.routes";
import kategoriRoutes from "./kategori.routes";
import orderRoutes from "./order.routes";
import userRoutes from "./user.routes";

const router = Router() as Router;

router.use("/menu", menuRoutes);
router.use("/varian-menu", varianMenuRoutes);
router.use("/opsi-menu", opsiMenuRoutes);
router.use("/auth", authRoutes);
router.use("/kategori", kategoriRoutes);
router.use("/order", orderRoutes);
router.use("/user", userRoutes);

export default router;