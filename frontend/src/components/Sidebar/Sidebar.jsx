import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Layers,
  Users,
  Percent,
  Bot,
} from "lucide-react";
import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>Sales Analytics</h2>
        <span>Business Intelligence</span>
      </div>

      <div className="sidebar-menu-group">
        <span className="menu-label">Main Menu</span>
        <NavLink to="/" className={({ isActive }) => (isActive ? "sidebar-item active" : "sidebar-item")}>
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/products" className={({ isActive }) => (isActive ? "sidebar-item active" : "sidebar-item")}>
          <Package size={18} />
          <span>Products</span>
        </NavLink>
        <NavLink to="/categories" className={({ isActive }) => (isActive ? "sidebar-item active" : "sidebar-item")}>
          <Layers size={18} />
          <span>Categories</span>
        </NavLink>
        <NavLink to="/customers" className={({ isActive }) => (isActive ? "sidebar-item active" : "sidebar-item")}>
          <Users size={18} />
          <span>Customers</span>
        </NavLink>
        <NavLink to="/discounts" className={({ isActive }) => (isActive ? "sidebar-item active" : "sidebar-item")}>
          <Percent size={18} />
          <span>Discount Analysis</span>
        </NavLink>
        <NavLink to="/ai-analyst" className={({ isActive }) => (isActive ? "sidebar-item active" : "sidebar-item")}>
          <Bot size={18} />
          <span>AI Business Analyst</span>
        </NavLink>
      </div>
    </aside>
  );
}

export default Sidebar;