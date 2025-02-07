import axios from "axios";

// Base URL for the API
const API_URI = "https://medical-store-backend-q0dx.onrender.com"; // Ensure this matches the backend route

// Get all products
export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URI}/getallproducts`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error.message);
  }
};

// Add a new product
export const addProduct = async (product) => {
  try {
    const response = await axios.post(`${API_URI}/addProduct`, product);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error.message);
  }
};

// Update an existing product
export const updateProduct = async (id, updatedProductData) => {
  try {
    const response = await axios.put(
      `${API_URI}/updateProduct/${id}`,
      updatedProductData
    );
    console.log("Updated product:", response.data);
  } catch (error) {
    console.error(
      "Error updating product:",
      error.response ? error.response.data : error.message
    );
  }
};

// ✅ Correctly placed delete function
export const deleteProduct = async (id) => {
  try {
    await axios.delete(`${API_URI}/deleteProduct/${id}`);
    console.log("Product deleted successfully!");
  } catch (error) {
    console.error("Error deleting product:", error.message);
  }
};
