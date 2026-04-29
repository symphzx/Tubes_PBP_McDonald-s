import { Router } from "express";
import { OrderController } from "../controllers/order.controller";
import auth from "../middlewares/auth.middleware";

const router: Router = Router();

// router.post("/", auth,OrderController.create);
// router.put("/:id", auth, OrderController.update);
// router.delete("/:id", auth, OrderController.delete);

// buat customer cekout
router.post("/checkout", OrderController.createOrder)

// buat adm
router.get("/", OrderController.getAll);
router.get("/:id", auth, OrderController.getOrderById)
router.patch("/:id/status", auth, OrderController.updateOrderStatus)

export default router;