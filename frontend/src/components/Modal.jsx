import React from "react";
import "../styles/Chat.css";

const Modal = ({ isOpen, title, onClose, onConfirm, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
        </div>

        <div className="modal-body">{children}</div>

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={onConfirm}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
