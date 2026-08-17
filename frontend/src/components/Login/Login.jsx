import React, { useState } from "react";
import { Lock, Mail, ArrowRight } from "lucide-react";
import "./Login.css";

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("siddhi.singh@example.com");
  const [password, setPassword] = useState("password123");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Yahan aap apna authentication logic ya API call add kar sakte hain
    if (onLoginSuccess) {
      onLoginSuccess();
    } else {
      alert("Logged in successfully!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Sales Analytics</h2>
          <p>Sign in to your business intelligence dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <button type="submit" className="login-submit-btn">
            <span>Sign In</span>
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;