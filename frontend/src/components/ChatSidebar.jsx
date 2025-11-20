import React from "react";

const ChatSidebar = ({ chats, selected, onSelect, open }) => {
  return (
    <div className={`sidebar ${open ? "open" : ""}`}>
      <div className="sidebar-header">
        <strong>Recent</strong>
      </div>
      <div className="chat-list">
        {chats.map((c) => (
          <button
            key={c.id}
            className={`chat-item ${c.id === selected ? "active" : ""}`}
            onClick={() => onSelect(c.id)}
          >
            <div className="chat-name">{c.name}</div>
            <div className="chat-snippet">
              {c.messages[c.messages.length - 1]?.text.slice(0, 60)}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
