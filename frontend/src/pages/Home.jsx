import React, { useState, useRef, useEffect } from "react";
import ChatSidebar from "../components/ChatSidebar";
import ChatTopbar from "../components/ChatTopbar";
import MessageList from "../components/MessageList";
import PromptInput from "../components/PromptInput";
import NewChatModal from "../components/NewChatModal";

const sampleChats = [
  {
    id: 1,
    name: "General",
    messages: [{ from: "bot", text: "Welcome to your chat." }],
  },
  {
    id: 2,
    name: "Ideas",
    messages: [{ from: "bot", text: "Brainstorm here." }],
  },
];

const Home = () => {
  const [chats, setChats] = useState(sampleChats);
  const [selected, setSelected] = useState(chats[0]?.id || null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!selected && chats.length) setSelected(chats[0].id);
  }, [chats, selected]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selected, chats]);

  const selectedChat = chats.find((c) => c.id === selected) || null;

  const createChat = () => {
    if (!newName.trim()) return;
    const id = Date.now();
    const chat = {
      id,
      name: newName.trim(),
      messages: [{ from: "bot", text: "New chat created." }],
    };
    setChats((s) => [...s, chat]);
    setNewName("");
    setShowNewModal(false);
    setSelected(id);
    setSidebarOpen(false);
  };

  const sendPrompt = () => {
    if (!prompt.trim() || !selectedChat) return;
    const text = prompt.trim();
    setChats((prev) =>
      prev.map((c) =>
        c.id === selected
          ? { ...c, messages: [...c.messages, { from: "user", text }] }
          : c
      )
    );
    setPrompt("");
    setTimeout(() => {
      setChats((prev) =>
        prev.map((c) =>
          c.id === selected
            ? {
                ...c,
                messages: [
                  ...c.messages,
                  { from: "bot", text: "This is a simulated response." },
                ],
              }
            : c
        )
      );
    }, 700);
  };

  return (
    <div className="page home chat-app">
      <ChatSidebar
        chats={chats}
        selected={selected}
        onSelect={(id) => {
          setSelected(id);
          setSidebarOpen(false);
        }}
        onNew={() => setShowNewModal(true)}
        open={sidebarOpen}
      />

      <div className="main">
        <ChatTopbar
          title={selectedChat?.name || "No chat selected"}
          onToggleSidebar={() => setSidebarOpen((s) => !s)}
          onNew={() => setShowNewModal(true)}
        />

        <MessageList
          messages={selectedChat?.messages}
          endRef={messagesEndRef}
        />

        <PromptInput
          prompt={prompt}
          setPrompt={setPrompt}
          onSend={sendPrompt}
          onClear={() => setPrompt("")}
        />
      </div>

      <NewChatModal
        visible={showNewModal}
        name={newName}
        setName={setNewName}
        onCancel={() => setShowNewModal(false)}
        onCreate={createChat}
      />
    </div>
  );
};

export default Home;
