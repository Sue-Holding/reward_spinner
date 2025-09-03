import { Router } from "express";
import  { spinReward, getSpins } from "../controllers/spinController";

const router = Router();

router.post("/", spinReward);
router.get("/:sellerId", getSpins);

export default router;