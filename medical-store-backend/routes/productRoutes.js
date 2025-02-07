import express from "express";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
const router = express.Router();

// Get all products
router.get("/getallproducts", getProducts);

// Add a new product
router.post("/addProduct", addProduct);

// Update an existing product
router.put("/updateProduct/:id", updateProduct);

router.delete("/deleteProduct/:id", deleteProduct);

export default router;
