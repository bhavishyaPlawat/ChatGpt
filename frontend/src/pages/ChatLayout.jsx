import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { chatService } from "../api/chat.service";

// Components
import Sidebar from "../components/Sidebar";
import MessageList from "../components/Chat/MessageList";
import ChatInput from "../components/chat/ChatInput";
import Modal from "../components/Modal";

// Styles
import "../styles/Chat.css";

const ChatLayout = () => {
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);

  // Data State
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // UI State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newChatName, setNewChatName] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 1. Fetch Chats
  useEffect(() => {
    const fetchUserChats = async () => {
      try {
        const data = await chatService.getAllChats();
        const chatList = data.chats || data;
        setChats(chatList);
      } catch (err) {
        console.error("Error loading chats:", err);
      }
    };
    fetchUserChats();
  }, []);

  // 2. Initialize Socket
  useEffect(() => {
    const newSocket = io("http://localhost:3000", { withCredentials: true });

    newSocket.on("ai-response", (data) => {
      setLoading(false);
      setMessages((prev) => [
        ...prev,
        { role: "model", content: data.content },
      ]);
    });

    newSocket.on("error", (err) => {
      if (err.toString().includes("Authentication")) navigate("/login");
    });

    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, [navigate]);

  // 3. Handlers
  const handleCreateChat = async () => {
    if (!newChatName.trim()) return;
    try {
      const data = await chatService.createChat(newChatName);
      const newChat = data.chat;

      setChats((prev) => [newChat, ...prev]);
      setCurrentChatId(newChat._id);
      setMessages([]);
      setIsModalOpen(false); // Close Popup
      setNewChatName("");
    } catch (error) {
      alert("Failed to create chat");
      console.log(error);
    }
  };

  const handleSendMessage = (text) => {
    if (!socket || !currentChatId) {
      if (!currentChatId) alert("Please create a chat first!");
      return;
    }
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);
    socket.emit("ai-message", { chat: currentChatId, content: text });
  };

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/");
  };

  return (
    <div className="chat-layout">
      {/* Mobile Top Bar */}
      <div className="mobile-header">
        <button
          className="hamburger-btn"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          ☰
        </button>
        <span style={{ fontWeight: 600 }}>ChatGPT Clone</span>
        <div style={{ width: 24 }}></div> {/* Spacer for alignment */}
      </div>

      <Sidebar
        chats={chats}
        currentChatId={currentChatId}
        onSelect={(id) => {
          setCurrentChatId(id);
          setMessages([]);
        }}
        onNewChat={() => setIsModalOpen(true)} // Triggers Popup
        onLogout={handleLogout}
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <main className="chat-main">
        <>
          <MessageList messages={messages} loading={loading} />
          <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
        </>
      </main>

      {/* Pop-up for Creating Chat */}
      <Modal
        isOpen={isModalOpen}
        title="Create New Chat"
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleCreateChat}
      >
        <input
          className="form-input"
          placeholder="Enter chat name (e.g. React Help)"
          value={newChatName}
          onChange={(e) => setNewChatName(e.target.value)}
          autoFocus
          onKeyDown={(e) => e.key === "Enter" && handleCreateChat()}
        />
      </Modal>
    </div>
  );
};

export default ChatLayout;
