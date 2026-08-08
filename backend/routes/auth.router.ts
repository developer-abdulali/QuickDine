import { Router } from "express";
import {
  getUserProfile,
  loginUser,
  registerUser,
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/me", protect, getUserProfile);

export default authRouter;
