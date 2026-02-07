import React from "react";
import "../styles/Chat.css";

const Modal = ({
  isOpen,
  title,
  onClose,
  children,
  onConfirm,
  confirmText,
}) => {
  if (!isOpen) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h3 style={{ marginBottom: "16px" }}>{title}</h3>
        {children}
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={onConfirm}>
            {confirmText || "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
