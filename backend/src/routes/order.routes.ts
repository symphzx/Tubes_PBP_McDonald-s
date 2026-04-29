import { Router } from "express";
import { OrderController } from "../controllers/order.controller";
import auth from "../middlewares/auth.middleware";

const router: Router = Router();

router.get("/", OrderController.getAll);
router.post("/checkout", OrderController.createOrder)
// router.post("/", auth,OrderController.create);
router.put("/:id", auth, OrderController.update);

export default router;