import React from "react";
import "../../styles/dialog_login_box.css"

interface UserNotFoundDialogProps {
  isOpen: boolean;
  onTryAgain: () => void;
  onSignIn: () => void;
}

const UserNotFoundDialog: React.FC<UserNotFoundDialogProps> = ({
  isOpen,
  onTryAgain, 
  onSignIn,
}) => {
    
  if (!isOpen) return null
    
  return (
    <div className="dialog-overlay">
    <dialog
      open={isOpen}
      className="dialog-content"
    >
      <h2 style={{ color: "#dc2626", fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem" }}>User Not Found</h2>
      <p style={{ color: "#374151", marginBottom: "1.5rem" }}>
        We couldn’t find a user with that information. Please try again or sign in.
      </p>
      <div className="dialog-actions">
        <button
          onClick={onTryAgain}
        >
          Try Again
        </button>
        <button
          onClick={onSignIn}
        >
          Sign In
        </button>
      </div>
    </dialog>
    </div>
  );
};

export default UserNotFoundDialog;
