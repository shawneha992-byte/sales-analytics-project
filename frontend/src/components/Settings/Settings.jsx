import React, { useState } from "react";
import {
  User,
  Bell,
  Shield,
  Palette,
  Save,
  CheckCircle,
} from "lucide-react";
import "./Settings.css";

function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);

  const [name, setName] = useState("Siddhi Singh");
  const [email, setEmail] = useState("siddhi.singh@example.com");
  const [role] = useState("Administrator");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [themeMode, setThemeMode] = useState("dark");

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="settings-page-container">
      {/* Page Title Section */}
      <div className="settings-page-header">
        <h1>Account Settings</h1>
        <p>Manage your profile preferences, security, and application settings</p>
      </div>

      <div className="settings-layout-modern">
        {/* Left Navigation Tabs */}
        <div className="settings-sidebar-nav">
          <button
            className={`settings-tab-btn ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            <User size={18} />
            <span>Profile Details</span>
          </button>
          <button
            className={`settings-tab-btn ${activeTab === "notifications" ? "active" : ""}`}
            onClick={() => setActiveTab("notifications")}
          >
            <Bell size={18} />
            <span>Notifications</span>
          </button>
          <button
            className={`settings-tab-btn ${activeTab === "security" ? "active" : ""}`}
            onClick={() => setActiveTab("security")}
          >
            <Shield size={18} />
            <span>Security & Access</span>
          </button>
          <button
            className={`settings-tab-btn ${activeTab === "appearance" ? "active" : ""}`}
            onClick={() => setActiveTab("appearance")}
          >
            <Palette size={18} />
            <span>Appearance</span>
          </button>
        </div>

        {/* Right Content Area */}
        <div className="settings-content-pane">
          <form onSubmit={handleSave}>
            {activeTab === "profile" && (
              <div className="settings-section">
                <div className="section-title">
                  <h3>Profile Information</h3>
                  <p>Update your personal account details</p>
                </div>

                <div className="settings-form-grid">
                  <div className="input-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="input-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="input-group">
                    <label>Access Role</label>
                    <input type="text" value={role} disabled />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="settings-section">
                <div className="section-title">
                  <h3>Notification Preferences</h3>
                  <p>Choose how you receive alerts and reports</p>
                </div>

                <div className="toggle-list">
                  <label className="toggle-item">
                    <div>
                      <strong>Email Reports</strong>
                      <p>Receive weekly analytics summary straight to your inbox</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={emailNotifications}
                      onChange={() => setEmailNotifications(!emailNotifications)}
                    />
                  </label>

                  <label className="toggle-item">
                    <div>
                      <strong>Real-time Push Alerts</strong>
                      <p>Get notified immediately on inventory or sales spikes</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={pushAlerts}
                      onChange={() => setPushAlerts(!pushAlerts)}
                    />
                  </label>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="settings-section">
                <div className="section-title">
                  <h3>Security & Authentication</h3>
                  <p>Manage your password and sign-in preferences</p>
                </div>

                <div className="settings-form-grid">
                  <div className="input-group">
                    <label>Current Password</label>
                    <input type="password" placeholder="••••••••" />
                  </div>

                  <div className="input-group">
                    <label>New Password</label>
                    <input type="password" placeholder="••••••••" />
                  </div>

                  <div className="input-group">
                    <label>Confirm New Password</label>
                    <input type="password" placeholder="••••••••" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "appearance" && (
              <div className="settings-section">
                <div className="section-title">
                  <h3>Appearance Settings</h3>
                  <p>Customize the look and feel of your dashboard</p>
                </div>

                <div className="settings-form-grid">
                  <div className="input-group">
                    <label>Theme Mode</label>
                    <select
                      value={themeMode}
                      onChange={(e) => setThemeMode(e.target.value)}
                    >
                      <option value="dark">Dark Theme (Default)</option>
                      <option value="midnight">Midnight OLED</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div className="settings-footer">
              <button type="submit" className="primary-save-btn">
                <Save size={16} />
                <span>Save Changes</span>
              </button>

              {saved && (
                <span className="success-badge">
                  <CheckCircle size={15} /> Changes saved successfully!
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Settings;