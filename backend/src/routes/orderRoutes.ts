import { Router } from "express"
import { OrderController } from "../controllers/OrderController"
import auth from "../middlewares/auth.middleware"

const router:Router = Router()

// buat customer cekout
router.post("/checkout", OrderController.createOrder)

// buat adm
router.get("/", auth, OrderController.getAllOrders)
router.get("/:id", auth, OrderController.getOrderById)
router.patch("/:id/status", auth, OrderController.updateOrderStatus)

export default router