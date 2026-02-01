import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  addToCart,
  addToWishlist,
  getProfileData
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/cart", protect, addToCart);
router.post("/wishlist", protect, addToWishlist);
router.get("/profile-data", protect, getProfileData);

export default router;
