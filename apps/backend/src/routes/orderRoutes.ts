import { Router } from "express";
import { addOrder, getOrders } from "../controllers/orderController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/add-order", authMiddleware, addOrder);    // POST /orders/add-order
router.get("/:sellerId", authMiddleware, getOrders);    // POST /orders/:sellerId

export default router;