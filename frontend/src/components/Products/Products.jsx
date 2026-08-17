import React, { useState } from "react";
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
} from "lucide-react";
import "./Products.css";

const initialProducts = [
  {
    id: "#PRD-301",
    name: "Wireless Headphones",
    category: "Electronics",
    price: "$149.00",
    stock: 342,
    status: "In Stock",
  },
  {
    id: "#PRD-302",
    name: "Gaming Laptop",
    category: "Computers",
    price: "$1,249.00",
    stock: 86,
    status: "In Stock",
  },
  {
    id: "#PRD-303",
    name: "Smartphone Pro",
    category: "Mobiles",
    price: "$899.00",
    stock: 124,
    status: "Low Stock",
  },
  {
    id: "#PRD-304",
    name: "Mechanical Keyboard",
    category: "Accessories",
    price: "$129.00",
    stock: 218,
    status: "In Stock",
  },
  {
    id: "#PRD-305",
    name: "Smart Watch",
    category: "Accessories",
    price: "$299.00",
    stock: 0,
    status: "Out of Stock",
  },
];

function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products] = useState(initialProducts);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard products-page">
      {/* Header with Right-Aligned Add Product Button */}
      <div className="dashboard-header">
        <div>
          
          <p>Manage your inventory, pricing, and product stock levels</p>
        </div>

        <div className="header-actions">
          <button className="primary-btn">
            <Plus size={17} />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Controls / Filter Bar */}
      <div className="products-controls">
        <div className="search-box">
          <Search size={17} />
          <input
            type="text"
            placeholder="Search products or categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button className="date-filter">
          <Filter size={17} />
          <span>Filter Status</span>
        </button>
      </div>

      {/* Products Table Card */}
      <div className="dashboard-card products-list-card">
        <div className="card-header">
          <div>
            <h3>All Products</h3>
            <p>A list of all store inventory items</p>
          </div>
        </div>

        <div className="product-table full-table">
          <div className="table-head product-grid-layout">
            <span>Product ID & Name</span>
            <span>Category</span>
            <span>Price</span>
            <span>Stock Status</span>
            <span>Actions</span>
          </div>

          {filteredProducts.map((product) => (
            <div className="product-row product-grid-layout" key={product.id}>
              <div className="product-info">
                <div>
                  <strong>{product.name}</strong>
                  <span className="product-id-tag">{product.id}</span>
                </div>
              </div>

              <span className="category-text">{product.category}</span>

              <strong className="revenue">{product.price}</strong>

              <div>
                <span
                  className={`status-badge ${product.status
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  <span className="status-dot" />
                  {product.status} ({product.stock})
                </span>
              </div>

              <div className="action-buttons">
                <button className="action-icon-btn" title="Edit">
                  <Edit3 size={15} />
                </button>
                <button className="action-icon-btn delete" title="Delete">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}

          {filteredProducts.length === 0 && (
            <div className="no-results">
              <p>No products found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;