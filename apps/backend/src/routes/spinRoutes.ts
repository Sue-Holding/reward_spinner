import { Router } from "express";
import  { spinReward, getSpins } from "../controllers/spinController";

const router = Router();

router.post("/", spinReward);       // POST /spins
router.get("/:sellerId", getSpins); // GET /spins/:sellerId

export default router;