import React from "react";

const MessageList = ({ messages, endRef }) => {
  return (
    <div className="messages" role="log">
      {messages && messages.length ? (
        messages.map((m, i) => (
          <div key={i} className={`msg ${m.from}`}>
            <div className="bubble">{m.text}</div>
          </div>
        ))
      ) : (
        <div className="empty">Select or create a chat to start messaging.</div>
      )}
      <div ref={endRef} />
    </div>
  );
};

export default MessageList;
