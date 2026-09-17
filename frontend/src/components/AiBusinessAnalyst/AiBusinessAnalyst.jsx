import React, { useState } from "react";
import {
  Bot,
  Send,
  Sparkles,
  TrendingUp,
  Package,
  Users,
  RefreshCw,
  Loader2,
  AlertCircle,
  Paperclip,
} from "lucide-react";

import "./AiBusinessAnalyst.css";

const API_URL = "http://localhost:4000/api/ai-analytics/ask";
const UPLOAD_API_URL = "http://localhost:4000/api/ai-analytics/upload";

const suggestedPrompts = [
  "What are my total revenue, total orders, average order value, and top 5 products?",
  "What are my most important business insights?",
  "Which products are at risk of running out of stock?",
  "Which products are generating the most revenue?",
];

function AiBusinessAnalyst() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I am your Sales Analytics AI Business Analyst. I can analyze your sales, revenue, customers, products, inventory, discounts, and overall business performance. What would you like to know?",
      time: "Just now",
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // =========================================================
  // ASK NORMAL BUSINESS ANALYTICS QUESTION
  // =========================================================

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const question = inputMessage.trim();

    if (!question || isLoading || isUploading) {
      return;
    }

    // Add user message immediately
    const userMsg = {
      sender: "user",
      text: question,
      time: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to get response from AI Business Analyst."
        );
      }

      const aiReply =
        data.answer || "No answer received from the AI.";

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: aiReply,
          time: "Just now",
        },
      ]);
    } catch (error) {
      console.error(
        "AI Business Analyst Error:",
        error
      );

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text:
            "Sorry, I could not connect to the AI Business Analyst right now. Please make sure the backend server is running on port 4000.",
          time: "Just now",
          error: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // =========================================================
  // CSV FILE UPLOAD
  // =========================================================

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    // Only CSV allowed
    if (!file.name.toLowerCase().endsWith(".csv")) {
      alert("Please select a CSV file.");
      e.target.value = "";
      return;
    }

    setSelectedFile(file);
    setIsUploading(true);

    // Show uploaded file in chat
    const userMsg = {
      sender: "user",
      text: `📎 Uploaded file: ${file.name}`,
      time: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);

    try {
      const formData = new FormData();

      // IMPORTANT:
      // Backend multer expects field name "file"
      formData.append("file", file);

      const response = await fetch(
        UPLOAD_API_URL,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to analyze uploaded CSV."
        );
      }

      // Add AI CSV analysis response
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text:
            data.answer ||
            "CSV analyzed successfully, but no answer was returned.",
          time: "Just now",
        },
      ]);
    } catch (error) {
      console.error(
        "CSV Upload Error:",
        error
      );

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text:
            "Sorry, I could not analyze the CSV file. Please make sure the backend server is running on port 4000 and the CSV upload endpoint is available.",
          time: "Just now",
          error: true,
        },
      ]);
    } finally {
      setIsUploading(false);
      setSelectedFile(null);

      // Allow selecting the same file again
      e.target.value = "";
    }
  };

  // =========================================================
  // RESET CHAT
  // =========================================================

  const handleResetSession = () => {
    setMessages([
      {
        sender: "ai",
        text: "Hello! I am your Sales Analytics AI Business Analyst. What would you like me to analyze?",
        time: "Just now",
      },
    ]);

    setInputMessage("");
    setSelectedFile(null);
  };

  // =========================================================
  // QUICK PROMPT
  // =========================================================

  const handlePromptClick = (prompt) => {
    setInputMessage(prompt);
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="dashboard ai-analyst-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="dashboard-header">
        <div>
          <h2>AI Business Analyst</h2>

          <p>
            Chat with your live AI assistant to uncover sales,
            customer, product, inventory and business insights.
          </p>
        </div>

        <div className="header-actions">
          <button
            className="refresh-btn"
            title="Reset Session"
            onClick={handleResetSession}
            disabled={isLoading || isUploading}
          >
            <RefreshCw size={17} />
          </button>
        </div>
      </div>

      {/* =====================================================
          MAIN LAYOUT
      ===================================================== */}

      <div className="ai-analyst-layout">

        {/* ===================================================
            CHAT SECTION
        =================================================== */}

        <div className="dashboard-card chat-container">

          {/* Chat Header */}

          <div className="card-header chat-top-bar">

            <div className="ai-title">

              <div className="ai-icon">
                <Sparkles size={18} />
              </div>

              <div>
                <h3>Intelligence Chatroom</h3>

                <p>
                  Connected to live business analytics
                </p>
              </div>

            </div>

            <span className="ai-status">
              ONLINE
            </span>

          </div>

          {/* =================================================
              MESSAGES
          ================================================= */}

          <div className="chat-messages-area">

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message-row ${
                  msg.sender === "user"
                    ? "user-row"
                    : "ai-row"
                }`}
              >

                {/* AI Avatar */}

                {msg.sender === "ai" && (
                  <div className="msg-avatar ai-avatar">
                    {msg.error ? (
                      <AlertCircle size={16} />
                    ) : (
                      <Bot size={16} />
                    )}
                  </div>
                )}

                {/* Message Bubble */}

                <div
                  className={`msg-bubble ${
                    msg.sender === "user"
                      ? "user-bubble"
                      : "ai-bubble"
                  } ${
                    msg.error
                      ? "error-bubble"
                      : ""
                  }`}
                >

                  <p
                    style={{
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {msg.text}
                  </p>

                  <span className="msg-time">
                    {msg.time}
                  </span>

                </div>

                {/* User Avatar */}

                {msg.sender === "user" && (
                  <div className="msg-avatar user-avatar-badge">
                    SS
                  </div>
                )}

              </div>
            ))}

            {/* =================================================
                LOADING MESSAGE
            ================================================= */}

            {(isLoading || isUploading) && (
              <div className="chat-message-row ai-row">

                <div className="msg-avatar ai-avatar">
                  <Bot size={16} />
                </div>

                <div className="msg-bubble ai-bubble">

                  <div className="ai-loading">

                    <Loader2
                      size={15}
                      className="loading-spinner"
                    />

                    <span>
                      {isUploading
                        ? "Analyzing uploaded CSV..."
                        : "Analyzing your business data..."}
                    </span>

                  </div>

                </div>

              </div>
            )}

          </div>

          {/* =================================================
              QUICK PROMPTS
          ================================================= */}

          <div className="suggested-chips">

            {suggestedPrompts.map(
              (prompt, index) => (
                <button
                  key={index}
                  className="prompt-chip"
                  onClick={() =>
                    handlePromptClick(prompt)
                  }
                  disabled={
                    isLoading ||
                    isUploading
                  }
                >
                  {prompt}
                </button>
              )
            )}

          </div>

          {/* =================================================
              CHAT INPUT
          ================================================= */}

          <form
            className="chat-input-form"
            onSubmit={handleSendMessage}
          >

            {/* =============================================
                CSV UPLOAD BUTTON
            ============================================= */}

            <label
              className="file-upload-btn"
              title="Upload CSV for analysis"
            >

              <Paperclip size={17} />

              <input
                type="file"
                accept=".csv,text/csv"
                onChange={handleFileUpload}
                disabled={
                  isLoading ||
                  isUploading
                }
                hidden
              />

            </label>

            {/* =============================================
                TEXT INPUT
            ============================================= */}

            <input
              type="text"
              placeholder={
                isUploading
                  ? "Analyzing CSV..."
                  : "Ask anything about sales, revenue, products, customers, or inventory..."
              }
              value={inputMessage}
              onChange={(e) =>
                setInputMessage(
                  e.target.value
                )
              }
              disabled={
                isLoading ||
                isUploading
              }
            />

            {/* =============================================
                SEND BUTTON
            ============================================= */}

            <button
              type="submit"
              className="send-btn"
              disabled={
                isLoading ||
                isUploading ||
                !inputMessage.trim()
              }
              title="Ask AI"
            >

              {isLoading ? (
                <Loader2
                  size={16}
                  className="loading-spinner"
                />
              ) : (
                <Send size={16} />
              )}

            </button>

          </form>

          {/* Optional selected file indicator */}

          {selectedFile && !isUploading && (
            <div className="selected-file">
              📎 {selectedFile.name}
            </div>
          )}

        </div>

        {/* =================================================
            RIGHT SIDEBAR
        ================================================= */}

        <div className="dashboard-card ai-sidebar-panel">

          <div className="card-header">

            <div>

              <h3>
                AI Capabilities
              </h3>

              <p>
                What your business analyst can analyze
              </p>

            </div>

          </div>

          <div className="ai-insights-list">

            {/* Sales */}

            <div className="insight-card-item">

              <div className="insight-icon up">
                <TrendingUp size={16} />
              </div>

              <div>

                <strong>
                  Sales & Revenue
                </strong>

                <p>
                  Revenue, orders, AOV,
                  growth trends and business
                  performance.
                </p>

              </div>

            </div>

            {/* Products */}

            <div className="insight-card-item">

              <div className="insight-icon warning">
                <Package size={16} />
              </div>

              <div>

                <strong>
                  Products & Inventory
                </strong>

                <p>
                  Top products, slow movers,
                  stock risks and
                  replenishment opportunities.
                </p>

              </div>

            </div>

            {/* Customers */}

            <div className="insight-card-item">

              <div className="insight-icon customer">
                <Users size={16} />
              </div>

              <div>

                <strong>
                  Customer Analytics
                </strong>

                <p>
                  Customer segments,
                  spending, orders and
                  retention opportunities.
                </p>

              </div>

            </div>

            {/* Recommendations */}

            <div className="insight-card-item">

              <div className="insight-icon">
                <Sparkles size={16} />
              </div>

              <div>

                <strong>
                  Business Recommendations
                </strong>

                <p>
                  Data-driven actions to
                  improve revenue, margins,
                  inventory and customer
                  retention.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AiBusinessAnalyst;