import React, { useState } from "react";
import {
  Tags,
  Plus,
  Search,
  Edit3,
  Trash2,
  Layers,
  ShoppingBag,
} from "lucide-react";
import "./Categories.css";

const initialCategories = [
  {
    id: "#CAT-01",
    name: "Electronics",
    description: "Gadgets, audio devices, and electronic hardware",
    productsCount: 142,
    revenueShare: "38%",
  },
  {
    id: "#CAT-02",
    name: "Computers",
    description: "Laptops, desktops, monitors, and components",
    productsCount: 85,
    revenueShare: "25%",
  },
  {
    id: "#CAT-03",
    name: "Accessories",
    description: "Keyboards, mice, hubs, and desk accessories",
    productsCount: 210,
    revenueShare: "20%",
  },
  {
    id: "#CAT-04",
    name: "Mobiles",
    description: "Smartphones, tablets, and mobile add-ons",
    productsCount: 64,
    revenueShare: "17%",
  },
];

function Categories() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories] = useState(initialCategories);

  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard categories-page">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          
          <p>Organize and manage store inventory categories</p>
        </div>

        <div className="header-actions">
          <button className="primary-btn">
            <Plus size={17} />
            <span>Add Category</span>
          </button>
        </div>
      </div>

      {/* Controls / Filter Bar */}
      <div className="categories-controls">
        <div className="search-box">
          <Search size={17} />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Categories Table Card */}
      <div className="dashboard-card categories-list-card">
        <div className="card-header">
          <div>
            <h3>All Categories</h3>
            <p>Breakdown of product sections and market share</p>
          </div>
        </div>

        <div className="product-table full-table">
          <div className="table-head category-grid-layout">
            <span>Category Name & ID</span>
            <span>Description</span>
            <span>Products Count</span>
            <span>Revenue Share</span>
            <span>Actions</span>
          </div>

          {filteredCategories.map((cat) => (
            <div className="product-row category-grid-layout" key={cat.id}>
              <div className="product-info">
                <div className="category-icon-wrapper">
                  <Layers size={16} />
                </div>
                <div>
                  <strong>{cat.name}</strong>
                  <span className="product-id-tag">{cat.id}</span>
                </div>
              </div>

              <span className="category-desc">{cat.description}</span>

              <div className="units-cell">
                <ShoppingBag size={14} />
                <span>{cat.productsCount} items</span>
              </div>

              <strong className="revenue">{cat.revenueShare}</strong>

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

          {filteredCategories.length === 0 && (
            <div className="no-results">
              <p>No categories found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Categories;