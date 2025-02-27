import { Router } from "express";
import { login, signup, verifyToken } from "../controllers/auth";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/verify", authMiddleware, verifyToken);

export default router;
