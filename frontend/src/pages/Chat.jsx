/* frontend/src/pages/Chat.jsx */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import "../styles/Chat.css";

const Chat = () => {
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  const [chats, setChats] = useState([]); // List of old chats
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  // 1. Initialize Socket & Check Auth
  useEffect(() => {
    // Simple auth check (cookie based, assumes browser handles it)
    // In a real app, you might verify token existence here or rely on axios interceptors

    const newSocket = io("http://localhost:3000", {
      withCredentials: true,
    });

    newSocket.on("connect", () => {
      console.log("Socket connected");
    });

    newSocket.on("ai-response", (data) => {
      setLoading(false);
      setMessages((prev) => [
        ...prev,
        { role: "model", content: data.content },
      ]);
    });

    newSocket.on("error", (err) => {
      console.error("Socket error:", err);
      // Optionally redirect to login if auth fails
      // navigate('/login');
    });

    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, [navigate]);

  // 2. Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 3. Mock Fetch Chats (Replace with real API if available)
  // Since the backend code provided currently lacks a 'GET /api/chat' endpoint for all chats,
  // this function is a placeholder or assumes you will add that endpoint.
  const fetchChats = async () => {
    try {
      // Uncomment this when backend supports fetching chat history list
      // const res = await axios.get('http://localhost:3000/api/chat', { withCredentials: true });
      // setChats(res.data.chats);

      // For UI Demo purposes, let's start with one empty chat
      if (chats.length === 0) {
        setChats([{ _id: "new", title: "New Conversation" }]);
        setCurrentChatId("new");
      }
    } catch (err) {
      console.error("Failed to fetch chats", err);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  // Handle "New Chat"
  const handleNewChat = async () => {
    try {
      // Create chat in backend
      const res = await axios.post(
        "http://localhost:3000/api/chat",
        { title: "New Chat" },
        { withCredentials: true }
      );
      const newChat = res.data.chat;
      setChats([newChat, ...chats]);
      setCurrentChatId(newChat._id);
      setMessages([]); // Clear message view
      setIsSidebarOpen(false); // Close sidebar on mobile
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  // Handle selecting a chat
  const handleSelectChat = (id) => {
    setCurrentChatId(id);
    // Fetch messages for this chat (Requires backend endpoint GET /api/chat/:id/messages)
    // setMessages([]);
    setIsSidebarOpen(false);
  };

  // Handle Sending
  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || !socket) return;

    // Add user message immediately to UI
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setLoading(true);

    // Emit to backend
    socket.emit("ai-message", {
      chat: currentChatId,
      content: input,
    });

    setInput("");
  };

  return (
    <div className="chat-layout">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div className="overlay" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`chat-sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <button onClick={handleNewChat} className="new-chat-btn">
            + New Chat
          </button>
        </div>

        <div className="chat-list">
          <div
            style={{
              padding: "0 8px",
              fontSize: "12px",
              color: "var(--muted)",
              marginBottom: "4px",
            }}
          >
            Recent
          </div>
          {chats.map((chat) => (
            <div
              key={chat._id}
              onClick={() => handleSelectChat(chat._id)}
              className={`chat-item ${
                currentChatId === chat._id ? "active" : ""
              }`}
            >
              {chat.title || "Untitled Chat"}
            </div>
          ))}
        </div>

        <div className="sidebar-footer">
          {/* User profile or settings could go here */}
          <div style={{ fontSize: "13px", color: "var(--muted)" }}>
            Logged In
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="chat-main">
        <header className="chat-header">
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              className="mobile-menu-btn"
              onClick={() => setIsSidebarOpen(true)}
            >
              ☰
            </button>
            <span style={{ fontWeight: 600 }}>
              {chats.find((c) => c._id === currentChatId)?.title || "Chat"}
            </span>
          </div>
          <ThemeToggle />
        </header>

        <div className="messages-container">
          {messages.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                marginTop: "auto",
                marginBottom: "auto",
                color: "var(--muted)",
              }}
            >
              <h1>How can I help you today?</h1>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`message-wrapper ${
                  msg.role === "user" ? "user" : "ai"
                }`}
              >
                <div
                  className={`avatar ${msg.role === "user" ? "user" : "ai"}`}
                >
                  {msg.role === "user" ? "U" : "AI"}
                </div>
                <div className="message-content">{msg.content}</div>
              </div>
            ))
          )}
          {loading && (
            <div className="message-wrapper ai">
              <div className="avatar ai">AI</div>
              <div
                className="message-content"
                style={{ fontStyle: "italic", color: "var(--muted)" }}
              >
                Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-area">
          <form onSubmit={handleSend} className="input-container">
            <input
              className="chat-input"
              placeholder="Message ChatGPT..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              className="send-btn"
              disabled={loading || !input.trim()}
            >
              ➤
            </button>
          </form>
          <div
            style={{
              textAlign: "center",
              fontSize: "11px",
              color: "var(--muted)",
              marginTop: "8px",
            }}
          >
            AI can make mistakes. Check important info.
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
