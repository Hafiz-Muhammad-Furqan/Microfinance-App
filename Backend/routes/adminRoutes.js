import express from "express";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import {
  loanReject,
  getLoanRequests,
  login,
  verifyAdmin,
  acceptAndAppointment,
} from "../controllers/adminController.js";
const router = express.Router();

router.post("/login", login);
router.get("/loan-requests", adminMiddleware, getLoanRequests);
router.post("/loan-reject", adminMiddleware, loanReject);
router.get("/verify-admin", adminMiddleware, verifyAdmin);
router.post("/accept-appointment", adminMiddleware, acceptAndAppointment);

export default router;
