import { Router } from "express";
import  { spinReward, getSpins } from "../controllers/spinController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authMiddleware, spinReward);       // POST /spins
router.get("/", authMiddleware, getSpins); // GET /spins/:sellerId

export default router;