import { Router } from "express";
import { addOrder, getOrders } from "../controllers/orderController";

const router = Router();

router.post("/add-order", addOrder);    // POST /orders/add-order
router.get("/:sellerId", getOrders);    // POST /orders/:sellerId

export default router;