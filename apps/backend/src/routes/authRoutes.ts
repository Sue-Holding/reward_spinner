import { Router } from "express"
import { login, logout } from "../controllers/authcontroller"

const router = Router();

router.post("/login", login);   // POST /auth/login
router.post("/logout", logout); // POST /auth/logout

export default router;