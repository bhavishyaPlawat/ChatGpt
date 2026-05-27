import React from "react";
import { Link } from "react-router-dom";
import "../styles/global.css";

const Landing = () => {
  return (
    <div className="landing-container">
      <h1 className="landing-title">Welcome to ChatGpt</h1>
      <p className="landing-subtitle">
        Experience the power of AI with long-term memory. Start a conversation,
        explore ideas, and let AI assist you.
      </p>
      <div style={{ display: "flex", gap: "16px" }}>
        <Link to="/login" className="landing-btn">
          Log in
        </Link>
        <Link
          to="/register"
          className="landing-btn"
          style={{
            background: "transparent",
            border: "1px solid var(--accent-color)",
            color: "var(--text-primary)",
          }}
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Landing;
