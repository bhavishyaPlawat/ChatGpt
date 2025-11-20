import React from "react";

const ChatTopbar = ({ title, onToggleSidebar, onNew }) => {
  return (
    <div className="topbar">
      <div className="left">
        <button
          className="theme-hamburger"
          onClick={onToggleSidebar}
          aria-label="Toggle chats"
        >
          ☰
        </button>
        <h2 className="title">{title}</h2>
      </div>
      <div className="right">
        <button className="btn-ghost" onClick={onNew}>
          ＋ New chat
        </button>
      </div>
    </div>
  );
};

export default ChatTopbar;
