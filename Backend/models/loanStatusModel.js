import mongoose from "mongoose";

const loanStatusSchema = new mongoose.Schema({
  loanId: { type: mongoose.Schema.Types.ObjectId, ref: "Loan", required: true },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    required: true,
  },
});

const loanStatusModel = mongoose.model("LoanStatus", loanStatusSchema);

export default loanStatusModel;
