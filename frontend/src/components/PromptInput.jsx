import React from "react";

const PromptInput = ({ prompt, setPrompt, onSend, onClear }) => {
  return (
    <div className="prompt">
      <textarea
        placeholder="Send a message..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSend();
          }
        }}
      />
      <div className="prompt-actions">
        <button className="btn-ghost" onClick={onClear}>
          Clear
        </button>
        <button className="btn-primary" onClick={onSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default PromptInput;
