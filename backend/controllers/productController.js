import Product from "../models/Product.js";

// Create product (admin only)
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all products (exclude deleted)
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ isDeleted: false });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, isDeleted: false });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update product (admin only)
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      req.body,
      { new: true }
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product updated", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Soft delete product (admin only)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted (soft delete)" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
