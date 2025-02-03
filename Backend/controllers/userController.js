import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import sendMail from "../utils/sendMail.js";

const registerUser = async (req, res) => {
  try {
    const { cnic, email, fullname } = req.body;

    const existingUser = await userModel.findOne({ cnic });
    if (existingUser) {
      return res.status(400).json({ message: "user already exists" });
    }

    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "user already exists" });
    }

    const tempPassword = crypto.randomBytes(8).toString("hex");

    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    try {
      const newUser = await userModel.create({
        cnic,
        email,
        fullname,
        password: hashedPassword,
      });

      sendMail(email, tempPassword);
      res.status(200).json(newUser);
    } catch (err) {
      console.error("Email sending failed:", err);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  const { cnic, recievedPassword, newPassword } = req.body;

  try {
    const user = await userModel.findOne({ cnic });
    if (!user) {
      return res.status(400).json({ message: "user does not exits" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      recievedPassword,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export { registerUser, loginUser, getProfile };
