import React from "react";
import "../styles/Chat.css";

const Sidebar = ({
  chats,
  currentChatId,
  onSelectChat,
  onNewChat,
  onLogout,
}) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>AI Chat</h2>
      </div>

      <button className="new-chat-btn" onClick={onNewChat}>
        <span>+</span> New Chat
      </button>

      <div className="chat-list">
        <div
          style={{
            fontSize: "12px",
            color: "var(--text-secondary)",
            padding: "0 4px",
          }}
        >
          Recent
        </div>
        {chats.map((chat) => (
          <div
            key={chat._id}
            className={`chat-item ${
              currentChatId === chat._id ? "active" : ""
            }`}
            onClick={() => onSelectChat(chat._id)}
          >
            {chat.title || "Untitled Conversation"}
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "auto",
          borderTop: "1px solid var(--border-color)",
          paddingTop: "12px",
        }}
      >
        <button
          className="btn-secondary"
          style={{
            width: "100%",
            border: "none",
            textAlign: "left",
            padding: "8px",
          }}
          onClick={onLogout}
        >
          Log out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
