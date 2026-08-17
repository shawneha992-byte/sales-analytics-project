import React, { useState } from "react";
import {
  Bot,
  Send,
  Sparkles,
  TrendingUp,
  Package,
  Users,
  ArrowUpRight,
  RefreshCw,
} from "lucide-react";
import "./AiBusinessAnalyst.css";

const suggestedPrompts = [
  "Why did electronics sales spike last month?",
  "Which products are at risk of running out of stock?",
  "Give me a strategy to improve customer retention rates.",
  "Summarize our top revenue drivers for Q2.",
];

function AiBusinessAnalyst() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I am your AI Business Analyst. I have analyzed your latest sales, inventory, and customer data. How can I assist you with your business strategy today?",
      time: "Just now",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg = {
      sender: "user",
      text: inputMessage,
      time: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    const query = inputMessage;
    setInputMessage("");

    // Simulate AI response
    setTimeout(() => {
      let aiReply = "Based on current dashboard trends, your performance remains strong across all primary sectors. Let me know if you would like a detailed breakdown of specific product lines!";
      
      if (query.toLowerCase().includes("stock") || query.toLowerCase().includes("inventory")) {
        aiReply = "Inventory check: Currently, 8 products are approaching their minimum stock levels, led by high-demand accessories and electronics[cite: 2]. Consider restocking soon to avoid fulfillment delays.";
      } else if (query.toLowerCase().includes("electronics") || query.toLowerCase().includes("spike")) {
        aiReply = "Electronics sales spiked due to high demand for Wireless Headphones and Gaming Laptops, showing an 18.4% increase compared to the previous period[cite: 2].";
      } else if (query.toLowerCase().includes("retention") || query.toLowerCase().includes("customer")) {
        aiReply = "Customer analytics show that electronics buyers have the highest repeat purchase rate[cite: 2]. Implementing a loyalty discount program for this segment could further boost retention.";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: aiReply,
          time: "Just now",
        },
      ]);
    }, 800);
  };

  return (
    <div className="dashboard ai-analyst-page">
      {/* Header */}
      <div className="dashboard-header">
        <div>
         
          <p>Chat with your live AI assistant to uncover deep financial and operational insights</p>
        </div>

        <div className="header-actions">
          <button className="refresh-btn" title="Reset Session">
            <RefreshCw size={17} />
          </button>
        </div>
      </div>

      <div className="ai-analyst-layout">
        {/* Chat Section */}
        <div className="dashboard-card chat-container">
          <div className="card-header chat-top-bar">
            <div className="ai-title">
              <div className="ai-icon">
                <Sparkles size={18} />
              </div>
              <div>
                <h3>Intelligence Chatroom</h3>
                <p>Connected to live database metrics</p>
              </div>
            </div>
            <span className="ai-status">ONLINE</span>
          </div>

          <div className="chat-messages-area">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message-row ${msg.sender === "user" ? "user-row" : "ai-row"}`}
              >
                {msg.sender === "ai" && (
                  <div className="msg-avatar ai-avatar">
                    <Bot size={16} />
                  </div>
                )}
                <div className={`msg-bubble ${msg.sender === "user" ? "user-bubble" : "ai-bubble"}`}>
                  <p>{msg.text}</p>
                  <span className="msg-time">{msg.time}</span>
                </div>
                {msg.sender === "user" && (
                  <div className="msg-avatar user-avatar-badge">
                    SS
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Prompts */}
          <div className="suggested-chips">
            {suggestedPrompts.map((prompt, idx) => (
              <button
                key={idx}
                className="prompt-chip"
                onClick={() => setInputMessage(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form className="chat-input-form" onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Ask anything about sales, forecasts, or inventory..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button type="submit" className="send-btn">
              <Send size={16} />
            </button>
          </form>
        </div>

        {/* Side Panel: Automated Insights */}
        <div className="dashboard-card ai-sidebar-panel">
          <div className="card-header">
            <div>
              <h3>Live Recommendations</h3>
              <p>Automated real-time diagnostics</p>
            </div>
          </div>

          <div className="ai-insights-list">
            <div className="insight-card-item">
              <div className="insight-icon up">
                <TrendingUp size={16} />
              </div>
              <div>
                <strong>Revenue Growth</strong>
                <p>Revenue increased by 18.6% compared with the previous period[cite: 2].</p>
              </div>
            </div>

            <div className="insight-card-item">
              <div className="insight-icon warning">
                <Package size={16} />
              </div>
              <div>
                <strong>Stock Alert</strong>
                <p>8 products are approaching their minimum stock level[cite: 2].</p>
              </div>
            </div>

            <div className="insight-card-item">
              <div className="insight-icon customer">
                <Users size={16} />
              </div>
              <div>
                <strong>Top Segment</strong>
                <p>Electronics customers show the highest repeat purchase rate[cite: 2].</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AiBusinessAnalyst;