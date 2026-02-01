import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/adminMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getProducts);
router.get("/:id", getProductById);

// Admin routes
router.post("/", protect, adminOnly, createProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;
