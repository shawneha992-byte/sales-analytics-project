import React, { useState } from "react";
import {
  Users,
  Plus,
  Search,
  Filter,
  Mail,
  Phone,
  ArrowUpRight,
  Edit3,
  Trash2,
} from "lucide-react";
import "./Customers.css";

const initialCustomers = [
  {
    id: "#CUST-101",
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "+91 98765 43210",
    orders: 14,
    totalSpent: "$4,850",
    status: "Active",
  },
  {
    id: "#CUST-102",
    name: "Ananya Patel",
    email: "ananya.patel@example.com",
    phone: "+91 91234 56789",
    orders: 9,
    totalSpent: "$3,420",
    status: "Active",
  },
  {
    id: "#CUST-103",
    name: "Arjun Mehta",
    email: "arjun.mehta@example.com",
    phone: "+91 99887 76655",
    orders: 5,
    totalSpent: "$1,890",
    status: "Inactive",
  },
  {
    id: "#CUST-104",
    name: "Priya Singh",
    email: "priya.singh@example.com",
    phone: "+91 94433 22110",
    orders: 21,
    totalSpent: "$7,640",
    status: "Active",
  },
  {
    id: "#CUST-105",
    name: "Aman Verma",
    email: "aman.verma@example.com",
    phone: "+91 95544 33221",
    orders: 2,
    totalSpent: "$599",
    status: "New",
  },
];

function Customers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers] = useState(initialCustomers);

  const filteredCustomers = customers.filter(
    (cust) =>
      cust.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cust.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard customers-page">
      {/* Header */}
      <div className="dashboard-header">
        <div>
         
          <p>View and manage your store's customer database and activity</p>
        </div>

        <div className="header-actions">
          <button className="primary-btn">
            <Plus size={17} />
            <span>Add Customer</span>
          </button>
        </div>
      </div>

      {/* Controls / Filter Bar */}
      <div className="customers-controls">
        <div className="search-box">
          <Search size={17} />
          <input
            type="text"
            placeholder="Search customers by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button className="date-filter">
          <Filter size={17} />
          <span>Filter Segment</span>
        </button>
      </div>

      {/* Customers Table Card */}
      <div className="dashboard-card customers-list-card">
        <div className="card-header">
          <div>
            <h3>All Customers</h3>
            <p>Active and past store purchasers</p>
          </div>
        </div>

        <div className="product-table full-table">
          <div className="table-head customer-grid-layout">
            <span>Customer Name</span>
            <span>Contact Info</span>
            <span>Orders</span>
            <span>Total Spent</span>
            <span>Status</span>
            <span>Actions</span>
          </div>

          {filteredCustomers.map((cust) => (
            <div className="product-row customer-grid-layout" key={cust.id}>
              <div className="product-info">
                <div className="customer-avatar-cell">
                  {cust.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <strong>{cust.name}</strong>
                  <span className="product-id-tag">{cust.id}</span>
                </div>
              </div>

              <div className="contact-info-cell">
                <span className="cust-email">
                  <Mail size={12} /> {cust.email}
                </span>
                <span className="cust-phone">
                  <Phone size={12} /> {cust.phone}
                </span>
              </div>

              <span className="units">{cust.orders} orders</span>

              <strong className="revenue">{cust.totalSpent}</strong>

              <div>
                <span
                  className={`status-badge ${cust.status.toLowerCase()}`}
                >
                  <span className="status-dot" />
                  {cust.status}
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

          {filteredCustomers.length === 0 && (
            <div className="no-results">
              <p>No customers found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Customers;