import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getChatRooms, createChatRoom, deleteChatRoom } from "../utils/api";
import { jwtDecode } from "jwt-decode";
import type { TokenPayload } from "../types/types";
import type { ChatRoom } from "../types/types";
import NoRoomName from "../components/messages/NoRoomName";
import HiveGrid from "../components/HiveGrid";
import { seededGradient } from "../utils/colors";
import "../styles/chat_list_page.css"


const ChatList = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [newRoomName, setNewRoomName] = useState("");
  const [username, setUsername] = useState("");
  const [isOpen, setIsOpen] = useState(false)
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");

    if (!token || !userId) return;
    getChatRooms(userId)
      .then((res) => {
        setRooms(res.data);
      });
    
    const decoded = jwtDecode<TokenPayload>(token!)
    setUsername(decoded.username)

  }, [userId]);

  const handleCreateRoom = async () => {
    const token = sessionStorage.getItem("authToken");
    if (!token || !userId) return;


    if (!newRoomName) setIsOpen(true);


    try {
      const res = await createChatRoom({ name: newRoomName, creator: userId})

      const createdRoom = res.data
      setRooms((prev) => [...prev, createdRoom]);
      setNewRoomName("");

    } catch (err) {
      console.error("Error creating room:", err);
    }
  };

  const toggleSelectMode = () => {
    setIsSelectMode((prev) => !prev);
    setSelectedIds(new Set());
  };

  const toggleSelection = (roomId: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(roomId)) next.delete(roomId);
      else next.add(roomId);
      return next;
    });
  };

  const handleDeleteSelected = async () => {
    if (!userId || selectedIds.size === 0) return;
    const count = selectedIds.size;
    if (!window.confirm(`Delete ${count} selected room${count > 1 ? "s" : ""}? This cannot be undone.`)) return;

    const ids = Array.from(selectedIds);
    const results = await Promise.allSettled(ids.map((id) => deleteChatRoom(id, userId)));
    const deletedIds = new Set(ids.filter((_, i) => results[i].status === "fulfilled"));
    setRooms((prev) => prev.filter((r) => !deletedIds.has(r.id)));
    setSelectedIds(new Set());
    setIsSelectMode(false);

    const failed = results.filter((r) => r.status === "rejected").length;
    if (failed > 0) console.error(`Failed to delete ${failed} room(s)`);
  };


  return (
    <div className="chat-list-page">
      <div className="chat-list-scroll"> 
      <h2  className="welcome-message">Welcome, user {username}</h2>
      <div className="create-room">
        <input
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
          placeholder="New room name"
        />
        <button onClick={handleCreateRoom}>Create Room</button>
      </div>

      <h3
      className="see-all-rooms"
      onClick={() => navigate('/all-rooms')}>
      See All Public Rooms
      </h3>

      <div className="room-actions">
        <button
          type="button"
          className={`select-toggle${isSelectMode ? " active" : ""}`}
          onClick={toggleSelectMode}
        >
          {isSelectMode ? "Cancel" : "Select"}
        </button>
        {isSelectMode && selectedIds.size > 0 && (
          <button
            type="button"
            className="delete-selected"
            onClick={handleDeleteSelected}
          >
            Delete ({selectedIds.size})
          </button>
        )}
      </div>

      <HiveGrid
        items={rooms}
        getKey={(room) => room.id}
        renderItem={(room) => {
          const isSelected = selectedIds.has(room.id);
          return (
            <div
              className={`room-card${isSelectMode ? " selectable" : ""}${isSelected ? " selected" : ""}`}
              style={{ backgroundImage: seededGradient(room.id) }}
              onClick={() =>
                isSelectMode ? toggleSelection(room.id) : navigate(`/room/${room.id}`)
              }
            >
              {isSelectMode && (
                <span
                  className={`room-card-marker${isSelected ? " checked" : ""}`}
                  aria-hidden="true"
                >
                  {isSelected ? "✓" : ""}
                </span>
              )}
              <h3>{room.name}</h3>
            </div>
          );
        }}
      />

      <NoRoomName isOpen={isOpen} onTryAgain={() => {
        navigate(`/chatlist/${userId}`)
        setIsOpen(false)
        }}/>
    </div>
    </div>
  );
};


  



export default ChatList;
