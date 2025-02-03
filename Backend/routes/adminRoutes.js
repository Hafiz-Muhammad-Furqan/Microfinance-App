import express from "express";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import {
  loanAccept,
  loanReject,
  getLoanRequests,
  login,
  verifyAdmin,
} from "../controllers/adminController.js";
const router = express.Router();

router.post("/login", login);
router.get("/loan-requests", adminMiddleware, getLoanRequests);
router.post("/loan-accept", adminMiddleware, loanAccept);
router.post("/loan-reject", adminMiddleware, loanReject);
router.get("/verify-admin", adminMiddleware, verifyAdmin);

export default router;
