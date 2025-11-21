import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Modal from "../components/Modal";
import "../styles/Chat.css";

const ChatLayout = () => {
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);

  // State
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newChatName, setNewChatName] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  // 1. Connect Socket & Load Initial Data
  useEffect(() => {
    const newSocket = io("http://localhost:3000", { withCredentials: true });

    newSocket.on("connect", () => console.log("Connected to AI"));
    newSocket.on("ai-response", (data) => {
      setLoading(false);
      setMessages((prev) => [
        ...prev,
        { role: "model", content: data.content },
      ]);
    });
    newSocket.on("error", (err) => {
      console.error("Socket error", err);
      if (err === "Authentication error: Invalid token") navigate("/login");
    });

    setSocket(newSocket);

    // Mock fetching chats - Replace with actual GET /api/chat if available
    // setChats([{ _id: "1", title: "General Ideas" }]);

    return () => newSocket.disconnect();
  }, [navigate]);

  // 2. Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // 3. Handlers
  const handleCreateChat = async () => {
    if (!newChatName.trim()) return;
    try {
      const res = await axios.post(
        "http://localhost:3000/api/chat",
        { title: newChatName },
        { withCredentials: true }
      );
      const newChat = res.data.chat;
      setChats([newChat, ...chats]);
      setCurrentChatId(newChat._id);
      setMessages([]); // Fresh start
      setIsModalOpen(false);
      setNewChatName("");
    } catch (error) {
      console.error("Failed to create chat", error);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim() || !socket || !currentChatId) {
      if (!currentChatId) alert("Please create or select a chat first!");
      return;
    }

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setLoading(true);
    socket.emit("ai-message", { chat: currentChatId, content: input });
    setInput("");
  };

  const handleLogout = () => {
    // Clear cookies logic here if needed
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/login");
  };

  return (
    <div className="chat-layout">
      <Sidebar
        chats={chats}
        currentChatId={currentChatId}
        onSelectChat={(id) => {
          setCurrentChatId(id);
          setMessages([]); /* Fetch history here */
        }}
        onNewChat={() => setIsModalOpen(true)}
        onLogout={handleLogout}
      />

      <main className="chat-main">
        <div className="messages-container">
          {!currentChatId ? (
            <div
              style={{
                margin: "auto",
                textAlign: "center",
                color: "var(--text-secondary)",
              }}
            >
              <h1>Welcome to AI Chat</h1>
              <p>Create a new chat to get started.</p>
            </div>
          ) : (
            <>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`message-row ${
                    msg.role === "user" ? "user" : "ai"
                  }`}
                >
                  <div
                    className={`avatar ${msg.role === "user" ? "user" : "ai"}`}
                  >
                    {msg.role === "user" ? "U" : "AI"}
                  </div>
                  <div className="message-bubble">{msg.content}</div>
                </div>
              ))}
              {loading && (
                <div className="message-row ai">
                  <div className="avatar ai">AI</div>
                  <div className="message-bubble">Thinking...</div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        <div className="input-wrapper">
          <form className="input-box" onSubmit={handleSendMessage}>
            <textarea
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) handleSendMessage(e);
              }}
              rows={1}
            />
            <button
              type="submit"
              className="send-btn"
              disabled={loading || !input.trim()}
            >
              ➤
            </button>
          </form>
        </div>
      </main>

      <Modal
        isOpen={isModalOpen}
        title="Name your new chat"
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleCreateChat}
      >
        <input
          className="form-input"
          placeholder="e.g. Project Brainstorming"
          value={newChatName}
          onChange={(e) => setNewChatName(e.target.value)}
          autoFocus
        />
      </Modal>
    </div>
  );
};

export default ChatLayout;
