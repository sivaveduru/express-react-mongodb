import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js"; // Import the router
import connectDB from "./connectDB.js"; // Import the database connection function

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Use productRoutes for the routes under /api/products
app.use("/api/products", productRoutes);

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
