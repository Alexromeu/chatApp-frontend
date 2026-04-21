import React from "react";

interface UserCardProps {
  username: string;
  lastMessage?: string;
  isSelf?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ username, lastMessage, isSelf }) => {
  const initial = username?.trim().charAt(0).toUpperCase() || "?";

  return (
    <div className={`user-card${isSelf ? " is-self" : ""}`}>
      <div className="user-avatar" aria-hidden>{initial}</div>

      <div className="user-info">
        <div className="user-name">
          {username}
          {isSelf && <span className="user-name-self">(you)</span>}
        </div>

        {lastMessage ? (
          <div className="user-last-message">{lastMessage}</div>
        ) : (
          <div className="user-last-message user-last-message-empty">No messages yet</div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
