import { Router } from "express";
import { OrderController } from "../controllers/order.controller";
import auth from "../middlewares/auth.middleware";
import { orderExist } from "../middlewares/order.validation.middleware";

const router: Router = Router();

router.get("/", OrderController.getAll);
router.post("/checkout", OrderController.createOrder)
router.put("/:id", auth, orderExist, OrderController.update);

// buat customer cekout
router.post("/checkout", OrderController.createOrder)

// buat adm
router.get("/", OrderController.getAll);
router.get("/:id", auth, orderExist, OrderController.getOrderById)
router.patch("/:id/status", auth, orderExist, OrderController.updateOrderStatus)

export default router;