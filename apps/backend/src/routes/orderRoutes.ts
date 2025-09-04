import { Router } from "express";
import { addOrder, getOrders } from "../controllers/orderController";
import { authMiddlware } from "../middleware/authMiddlewre";

const router = Router();

router.post("/add-order", authMiddlware, addOrder);    // POST /orders/add-order
router.get("/:sellerId", authMiddlware, getOrders);    // POST /orders/:sellerId

export default router;