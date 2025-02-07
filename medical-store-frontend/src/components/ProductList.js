import React, { useState, useEffect } from "react";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null); // Track product being edited

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const productList = await getProducts();
      setProducts(productList);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Handle form input change
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle form submission (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.name || !product.price || !product.description) {
      alert("Please fill in all fields.");
      return;
    }

    if (editingId) {
      await updateProduct(editingId, product);
      setEditingId(null);
    } else {
      await addProduct(product);
    }

    fetchProducts(); // Refresh product list
    setProduct({ name: "", price: "", description: "" }); // Reset form
  };

  // Handle Edit
  const handleEdit = (product) => {
    setEditingId(product._id);
    setProduct({
      name: product.name,
      price: product.price,
      description: product.description,
    });
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      fetchProducts();
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center text-primary">Medical Store Products</h2>

      {/* Product Form */}
      <div className="card p-3 mb-4 shadow">
        <h4>{editingId ? "Edit Product" : "Add Product"}</h4>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={product.name}
            placeholder="Name"
            className="form-control mb-2"
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            value={product.price}
            placeholder="Price"
            className="form-control mb-2"
            onChange={handleChange}
          />
          <textarea
            name="description"
            value={product.description}
            placeholder="Description"
            className="form-control mb-2"
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-success w-100">
            {editingId ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>

      {/* Product List */}
      {products.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered table-striped shadow">
            <thead className="table-primary text-center">
              <tr>
                <th>Name</th>
                <th>Price ($)</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <tr key={prod._id}>
                  <td>{prod.name}</td>
                  <td>${prod.price}</td>
                  <td>{prod.description}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(prod)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(prod._id)}
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-muted">No products available.</p>
      )}
    </div>
  );
};

export default ProductList;
