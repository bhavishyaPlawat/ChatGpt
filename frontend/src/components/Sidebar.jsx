import React from "react";
import "../styles/Chat.css";

const Sidebar = ({ chats, currentChatId, onSelect, onNewChat, onLogout }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <button className="btn-new-chat" onClick={onNewChat}>
          <span>＋</span> New chat
        </button>
      </div>

      <div className="chat-history">
        <div
          style={{
            fontSize: "12px",
            color: "var(--text-secondary)",
            marginBottom: "8px",
          }}
        >
          Recent
        </div>
        {chats.map((chat) => (
          <div
            key={chat._id}
            className={`history-item ${
              currentChatId === chat._id ? "active" : ""
            }`}
            onClick={() => onSelect(chat._id)}
          >
            {chat.title || "Untitled Chat"}
          </div>
        ))}
      </div>

      <div className="sidebar-bottom">
        <button className="btn-logout" onClick={onLogout}>
          Log out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
