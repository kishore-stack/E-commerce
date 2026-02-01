import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// test route
router.get("/test", (req, res) => {
  res.send("Auth route working");
});

// auth
router.post("/register", registerUser);
router.post("/login", loginUser);

// protected profile
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

export default router;
