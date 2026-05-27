import React, { useState } from "react";

const ChatInput = ({ onSendMessage, disabled }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;
    onSendMessage(input);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <div className="input-area">
      <form className="input-container" onSubmit={handleSubmit}>
        <textarea
          className="chat-input"
          placeholder="Send a message..."
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />
        <button
          type="submit"
          className="btn-send"
          disabled={disabled || !input.trim()}
        >
          {/* Send Icon SVG */}
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
      <div
        style={{
          textAlign: "center",
          fontSize: "0.75rem",
          color: "#666",
          marginTop: "10px",
        }}
      >
        ChatGPT can make mistakes. Consider checking important information.
      </div>
    </div>
  );
};

export default ChatInput;
