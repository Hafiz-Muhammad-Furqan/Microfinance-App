import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
} from "../controllers/userController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getProfile);

export default router;
