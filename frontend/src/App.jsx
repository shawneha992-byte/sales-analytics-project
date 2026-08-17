import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { Bell, Settings as SettingsIcon, User, ChevronDown } from "lucide-react";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import Products from "./components/Products/Products";
import Categories from "./components/Categories/Categories";
import Customers from "./components/Customers/Customers";
import DiscountAnalysis from "./components/DiscountAnalysis/DiscountAnalysis";
import AiBusinessAnalyst from "./components/AiBusinessAnalyst/AiBusinessAnalyst";
import Settings from "./components/Settings/Settings";
import Login from "./components/Login/Login";
import "./App.css";

function Navbar({ onLogout }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();

  const getPageTitle = (pathname) => {
    switch (pathname) {
      case "/":
        return "Dashboard Overview";
      case "/products":
        return "Products Management";
      case "/categories":
        return "Categories Hub";
      case "/customers":
        return "Customer Management";
      case "/discounts":
        return "Discount & Promo Analysis";
      case "/ai-analyst":
        return "AI Business Analyst";
      case "/settings":
        return "Account Settings";
      default:
        return "Sales Analytics";
    }
  };

  return (
    <header className="top-navbar">
      <div className="navbar-left">
        <h2>{getPageTitle(location.pathname)}</h2>
      </div>

      <div className="navbar-right">
        {/* Notifications Dropdown */}
        <div className="nav-dropdown-container">
          <button 
            className="nav-icon-btn" 
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            title="Notifications"
          >
            <Bell size={18} />
            <span className="badge-dot"></span>
          </button>

          {showNotifications && (
            <div className="dropdown-panel notification-panel">
              <div className="dropdown-header">
                <h4>Notifications</h4>
                <span>3 New</span>
              </div>
              <ul className="dropdown-list">
                <li>
                  <div>
                    <p>Low stock warning</p>
                    <small>Galaxy Mobile inventory is critical</small>
                  </div>
                </li>
                <li>
                  <div>
                    <p>Report Ready</p>
                    <small>Q3 Sales analytics compiled</small>
                  </div>
                </li>
                <li>
                  <div>
                    <p>Pipeline Synced</p>
                    <small>Azure Synapse updated successfully</small>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="nav-dropdown-container">
          <div 
            className="profile-trigger" 
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
          >
            <div className="user-avatar-sm">SS</div>
            <span className="profile-name">Siddhi Singh</span>
            <ChevronDown size={14} className="chevron-icon" />
          </div>

          {showProfileMenu && (
            <div className="dropdown-panel profile-panel">
              <div className="profile-panel-header">
                <strong>Siddhi Singh</strong>
                <small>siddhi@example.com</small>
              </div>
              <div className="dropdown-divider"></div>
              
              <Link to="/settings" className="dropdown-item" onClick={() => setShowProfileMenu(false)}>
                <User size={15} /> My Profile
              </Link>

              <Link to="/settings" className="dropdown-item" onClick={() => setShowProfileMenu(false)}>
                <SettingsIcon size={15} /> Account Settings
              </Link>

              <div className="dropdown-divider"></div>
              
              {/* Logout Button Trigger */}
              <button 
                className="dropdown-item logout-btn" 
                onClick={() => {
                  setShowProfileMenu(false);
                  onLogout();
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-pane">
          <Navbar onLogout={() => setIsAuthenticated(false)} />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/discounts" element={<DiscountAnalysis />} />
              <Route path="/ai-analyst" element={<AiBusinessAnalyst />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;