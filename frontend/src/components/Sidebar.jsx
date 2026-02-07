import React from "react";
import "../styles/Chat.css";

const Sidebar = ({
  chats,
  currentChatId,
  onSelect,
  onNewChat,
  onLogout,
  isOpen,
  toggleSidebar,
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* Top Section: New Chat */}
        <div className="sidebar-top">
          <button
            className="btn-new-chat"
            onClick={() => {
              onNewChat();
              if (window.innerWidth < 768) toggleSidebar();
            }}
          >
            <span>+</span>
            <span>New Chat</span>
          </button>
        </div>

        {/* Middle Section: Chat List */}
        <div className="chat-history">
          <div className="history-label">Your Chats</div>
          {chats && chats.length > 0 ? (
            chats.map((chat) => (
              <div
                key={chat._id}
                className={`history-item ${currentChatId === chat._id ? "active" : ""}`}
                onClick={() => {
                  onSelect(chat._id);
                  if (window.innerWidth < 768) toggleSidebar();
                }}
              >
                {/* Chat Icon SVG */}
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>

                <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                  {chat.title || "Untitled Conversation"}
                </span>
              </div>
            ))
          ) : (
            <div
              style={{ padding: "10px", color: "#666", fontSize: "0.85rem" }}
            >
              No chat history.
            </div>
          )}
        </div>

        {/* Bottom Section: Profile/Logout */}
        <div className="sidebar-bottom">
          <button className="btn-logout" onClick={onLogout}>
            {/* Logout Icon */}
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Log out
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
