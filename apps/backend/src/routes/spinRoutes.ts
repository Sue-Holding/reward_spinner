import { Router } from "express";
import  { spinReward, getSpins } from "../controllers/spinController";
import { authMiddlware } from "../middleware/authMiddlewre";

const router = Router();

router.post("/", authMiddlware, spinReward);       // POST /spins
router.get("/:sellerId", authMiddlware, getSpins); // GET /spins/:sellerId

export default router;