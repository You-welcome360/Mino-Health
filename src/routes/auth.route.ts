import { Router } from "express";

import {
  register,
  login,
} from "../controllers/auth.controller";

import { getProfile } from "../controllers/profile.controller";
// import { authMiddleware, AuthRequest } from "../middleware/auth.middleware";

import { validateRequest } from "../middleware/validate.middleware";

import {
  registerSchema,
  loginSchema,
} from "../schemas/auth.schema";
import { authenticateToken } from "../middleware/auth.middleware";


const router = Router();

router.post(
  "/register",
  validateRequest(registerSchema),
  register
);

router.post(
  "/login",
  validateRequest(loginSchema),
  login
);

router.get(
  "/profile",
  authenticateToken,
  getProfile
);

export default router;