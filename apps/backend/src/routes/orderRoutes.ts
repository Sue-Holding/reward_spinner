import { Router } from "express";
import { addOrder, getOrders } from "../controllers/orderController";

const router = Router();

router.post("/add-order", addOrder);
router.get("/:sellerId", getOrders);

export default router;