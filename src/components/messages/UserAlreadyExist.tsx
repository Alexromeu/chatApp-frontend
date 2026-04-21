import React from "react";
import "../../styles/dialog_login_box.css"

interface UserAlreadyExist {
  isOpen: boolean;
  goToLogin: () => void;
}

const UserAlreadyExist: React.FC<UserAlreadyExist> = ({
  isOpen,
  goToLogin, 

}) => {
    
  if (!isOpen) return null
    
  return (
    <div className="dialog-overlay">
    <dialog
      open={isOpen}
      className="dialog-content"
    >
      <h2 className="dialog-title dialog-title-error">User already exist</h2>
      <p className="dialog-body">
        Please try to login.
      </p>
      <div className="dialog-actions">
        <button
          onClick={goToLogin}
        >
          Login
        </button>
      </div>
    </dialog>
    </div>
  );
};

export default UserAlreadyExist;
