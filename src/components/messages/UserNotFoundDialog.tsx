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
      <h2 className="dialog-title dialog-title-error">User Not Found</h2>
      <p className="dialog-body">
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
