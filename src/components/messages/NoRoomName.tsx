import React from "react";
import "../../styles/dialog_login_box.css"

interface NoRoomNameProps {
  isOpen: boolean;
  onTryAgain: () => void;
}

const NoRoomName: React.FC<NoRoomNameProps> = ({
  isOpen,
  onTryAgain, 

}) => {
    
  if (!isOpen) return null
    
  return (
    <div className="dialog-overlay">
    <dialog
      open={isOpen}
      className="dialog-content"
    >
      <h2 style={{ color: "#dc2626", fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem" }}>No chat room name provided</h2>
      <p style={{ color: "#374151", marginBottom: "1.5rem" }}>
        Please try again.
      </p>
      <div className="dialog-actions">
        <button
          onClick={onTryAgain}
        >
          Try Again
        </button>
      </div>
    </dialog>
    </div>
  );
};

export default NoRoomName;
