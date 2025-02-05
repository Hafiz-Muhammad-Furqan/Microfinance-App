import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  loanCategory: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  loanAmount: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  emi: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
  initialAmount: {
    type: Number,
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: false,
    default: null,
  },
  appointmentTime: {
    type: String,
    required: false,
    default: null,
  },
  appointmentLocation: {
    type: String,
    required: false,
    default: null,
  },
});

const loanModel = mongoose.model("Loan", loanSchema);

export default loanModel;
