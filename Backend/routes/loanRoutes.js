import express from "express";
const router = express.Router();
import { loanRequest, getLoanRequests } from "../controllers/loanController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

router.post("/loan-request", authMiddleware, loanRequest);
router.get("/get-loan-requests", authMiddleware, getLoanRequests);

export default router;
