import express from "express";
import User from "../models/User.js";
import { protect } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/adminMiddleware.js";

const router = express.Router();

// Get all users (admin only)
router.get("/users", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
