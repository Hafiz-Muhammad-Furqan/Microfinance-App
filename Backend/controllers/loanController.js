import loanModel from "../models/loanModel.js";

const loanRequest = (req, res) => {
  const {
    initialAmount,
    emi,
    duration,
    loanAmount,
    subCategory,
    loanCategory,
  } = req.body;

  if (
    !loanCategory ||
    !subCategory ||
    !loanAmount ||
    !initialAmount ||
    !duration ||
    !emi
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const loan = loanModel.create({
      user: req.user._id,
      loanCategory,
      subCategory,
      loanAmount,
      duration,
      emi,
      initialAmount,
    });
    res.status(200).json({ loan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getLoanRequests = async (req, res) => {
  try {
    const loans = await loanModel.find({ user: req.user._id });
    res.status(200).json(loans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export { loanRequest, getLoanRequests };
