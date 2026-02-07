import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Modal from "../components/Modal";
import "../styles/Chat.css";

// --- New Imports for Markdown & Code Highlighting ---
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const ChatLayout = () => {
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);

  // State
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newChatName, setNewChatName] = useState("");

  const messagesEndRef = useRef(null);

  // 1. Initialize Socket & Load Initial Data
  useEffect(() => {
    const newSocket = io("http://localhost:3000", { withCredentials: true });

    newSocket.on("connect", () => console.log("Socket connected"));

    newSocket.on("ai-response", (data) => {
      setLoading(false);
      setMessages((prev) => [
        ...prev,
        { role: "model", content: data.content },
      ]);
    });

    newSocket.on("error", (err) => {
      console.error("Socket error:", err);
      if (err.toString().includes("Authentication")) navigate("/login");
    });

    setSocket(newSocket);

    // Mock fetching chats (In real app, fetch from API here)
    // fetchChats();

    return () => newSocket.disconnect();
  }, [navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleCreateChat = async () => {
    if (!newChatName.trim()) return;
    try {
      const res = await axios.post(
        "http://localhost:3000/api/chat",
        { title: newChatName },
        { withCredentials: true },
      );
      const newChat = res.data.chat;
      setChats([newChat, ...chats]);
      setCurrentChatId(newChat._id);
      setMessages([]);
      setIsModalOpen(false);
      setNewChatName("");
    } catch (error) {
      console.error("Error creating chat", error);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim() || !socket || !currentChatId) {
      if (!currentChatId) alert("Please create a chat first!");
      return;
    }

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setLoading(true);
    socket.emit("ai-message", { chat: currentChatId, content: input });
    setInput("");
  };

  const handleLogout = () => {
    // Simple cookie clear simulation or API call
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/");
  };

  return (
    <div className="chat-layout">
      <Sidebar
        chats={chats}
        currentChatId={currentChatId}
        onSelect={(id) => {
          setCurrentChatId(id);
          setMessages([]); /* Fetch messages for chat here */
        }}
        onNewChat={() => setIsModalOpen(true)}
        onLogout={handleLogout}
      />

      <main className="chat-main">
        <div className="chat-view">
          {!currentChatId ? (
            <div
              style={{
                margin: "auto",
                textAlign: "center",
                color: "var(--text-secondary)",
              }}
            >
              <h1>ChatGpt</h1>
              <p>Create a new chat to begin.</p>
            </div>
          ) : (
            <>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`message ${msg.role === "user" ? "user" : "ai"}`}
                >
                  <div
                    className={`avatar ${msg.role === "user" ? "user" : "ai"}`}
                  >
                    {msg.role === "user" ? "U" : "AI"}
                  </div>

                  {/* --- UPDATED CONTENT RENDERING --- */}
                  <div className="content">
                    {msg.role === "model" ? (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          code({ inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(
                              className || "",
                            );
                            return !inline && match ? (
                              <SyntaxHighlighter
                                style={vscDarkPlus}
                                language={match[1]}
                                PreTag="div"
                                {...props}
                              >
                                {String(children).replace(/\n$/, "")}
                              </SyntaxHighlighter>
                            ) : (
                              <code className={className} {...props}>
                                {children}
                              </code>
                            );
                          },
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    ) : (
                      // Keep user messages simple text
                      msg.content
                    )}
                  </div>
                  {/* --- END UPDATED CONTENT RENDERING --- */}
                </div>
              ))}
              {loading && (
                <div className="message ai">
                  <div className="avatar ai">AI</div>
                  <div className="content" style={{ fontStyle: "italic" }}>
                    Thinking...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        <div className="input-area">
          <form className="input-container" onSubmit={handleSendMessage}>
            <textarea
              className="chat-input"
              placeholder="Send a message..."
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) handleSendMessage(e);
              }}
            />
            <button
              type="submit"
              className="btn-send"
              disabled={loading || !input.trim()}
            >
              ➤
            </button>
          </form>
        </div>
      </main>

      <Modal
        isOpen={isModalOpen}
        title="Create New Chat"
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleCreateChat}
      >
        <input
          className="form-input"
          placeholder="Chat Name (e.g., React Help)"
          value={newChatName}
          onChange={(e) => setNewChatName(e.target.value)}
          autoFocus
        />
      </Modal>
    </div>
  );
};

export default ChatLayout;
