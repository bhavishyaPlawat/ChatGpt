import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const MessageList = ({ messages, loading }) => {
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="chat-messages-container">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`message ${msg.role === "user" ? "user" : "ai"}`}
        >
          {/* Avatar */}
          <div className={`avatar ${msg.role === "user" ? "user" : "ai"}`}>
            {msg.role === "user" ? "U" : "AI"}
          </div>

          {/* Content */}
          <div className="content">
            {msg.role === "model" ? (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
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
              // Render user messages as plain text
              msg.content
            )}
          </div>
        </div>
      ))}

      {/* Loading State */}
      {loading && (
        <div className="message ai">
          <div className="avatar ai">AI</div>
          <div className="content loading-dots">Thinking...</div>
        </div>
      )}

      {/* Invisible element to scroll to */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
