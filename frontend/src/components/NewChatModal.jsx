import React from "react";

const NewChatModal = ({ visible, name, setName, onCancel, onCreate }) => {
  if (!visible) return null;
  return (
    <div className="modal" role="dialog" aria-modal="true">
      <div className="modal-card">
        <h3>Name your chat</h3>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Chat name"
        />
        <div className="modal-actions">
          <button className="btn-ghost" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-primary" onClick={onCreate}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewChatModal;
