import loanModel from "../models/loanModel.js";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === process.env.Email && password === process.env.Password) {
      const token = jwt.sign({ email: email }, process.env.JWT_SECRET);
      res.json({ token });
      return;
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const verifyAdmin = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (user.email === "iamadmin@gmail.com") {
      return res.json({ message: "Admin authorized" });
    } else {
      return res.status(403).json({ message: "Forbidden" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getLoanRequests = async (req, res) => {
  try {
    const loans = await loanModel.find().populate("user");

    if (loans.length === 0) {
      return res.status(404).json({ message: "No loans found" });
    }

    res.status(200).json(loans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const acceptAndAppointment = async (req, res) => {
  try {
    const { loanId, date, time, location } = req.body;
    const loan = await loanModel.findByIdAndUpdate(
      loanId,
      {
        status: "Accepted",
        appointmentDate: date,
        appointmentLocation: location,
        appointmentTime: time,
      },
      { new: true }
    );
    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }
    res.status(200).json(loan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const loanReject = async (req, res) => {
  try {
    const { loanId } = req.body;
    const loanStatus = await loanModel.findByIdAndUpdate(
      loanId,
      { status: "Rejected" },
      { new: true }
    );
    if (!loanStatus) {
      return res.status(404).json({ message: "Loan not found" });
    }
    res.status(200).json(loanStatus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export {
  loanReject,
  getLoanRequests,
  login,
  verifyAdmin,
  acceptAndAppointment,
};
