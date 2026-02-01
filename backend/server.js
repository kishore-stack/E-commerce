import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productroutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";


dotenv.config();
connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// base test
app.get("/", (req, res) => {
  res.send("Server running");
});

// auth routes
app.use("/api/auth", authRoutes);


app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", cartRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
