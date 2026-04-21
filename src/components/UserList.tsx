import { useEffect, useMemo, useState } from "react";
import { fetchUsernames } from "../utils/fetchUsernames";
import UserCard from "./UserCard";
import type { Message } from "../types/types";
import "../styles/user_card.css";

interface UserListProps {
  onlineUserIds: string[];
  messages: Message[];
  selfUserId: string | null;
}

const UserList = ({ onlineUserIds, messages, selfUserId }: UserListProps) => {
  const [usernameById, setUsernameById] = useState<Record<string, string>>({});

  const idsKey = onlineUserIds.join("|");

  useEffect(() => {
    let cancelled = false;
    if (onlineUserIds.length === 0) {
      setUsernameById({});
      return;
    }

    fetchUsernames(onlineUserIds).then((names) => {
      if (cancelled) return;
      const map: Record<string, string> = {};
      onlineUserIds.forEach((id, i) => {
        map[id] = names[i] ?? id;
      });
      setUsernameById(map);
    });

    return () => {
      cancelled = true;
    };
    // idsKey is the stable key derived from onlineUserIds — only refetch when membership changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey]);

  const lastMessageBySender = useMemo(() => {
    const map: Record<string, Message> = {};
    for (const msg of messages) {
      const existing = map[msg.senderId];
      if (!existing || msg.timestamp >= existing.timestamp) {
        map[msg.senderId] = msg;
      }
    }
    return map;
  }, [messages]);

  return (
    <aside className="chat-sidebar">
      <h3 className="chat-sidebar-title">
        <span>Connected</span>
        <span className="chat-sidebar-count">{onlineUserIds.length}</span>
      </h3>

      <div className="user-list">
        {onlineUserIds.length === 0 && (
          <p className="user-list-empty">No one here yet</p>
        )}

        {onlineUserIds.map((id) => (
          <UserCard
            key={id}
            username={usernameById[id] ?? "…"}
            lastMessage={lastMessageBySender[id]?.content}
            isSelf={id === selfUserId}
          />
        ))}
      </div>
    </aside>
  );
};

export default UserList;
