import { Router } from "express";
import { OrderController } from "../controllers/OrderController";
import auth from "../middlewares/auth.middleware";

const router: Router = Router();

router.get("/", OrderController.getAll);
// router.post("/", auth,OrderController.create);
// router.put("/:id", auth, OrderController.update);
// router.delete("/:id", auth, OrderController.delete);

export default router;