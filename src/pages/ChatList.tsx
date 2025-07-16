import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getChatRooms, createChatRoom } from "../utils/api";


type ChatRoom = {
  id: string;
  name: string;
};

const ChatList = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [newRoomName, setNewRoomName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token || !userId) return;
    getChatRooms(userId)
      .then((res) => {
        setRooms(res.data);
      });
  }, [userId]);

  const handleCreateRoom = async () => {
    const token = localStorage.getItem("authToken");
    if (!newRoomName || !token || !userId) return;

    try {
      const res = await createChatRoom({ name: newRoomName, creator: userId})

      const createdRoom = res.data
      setRooms((prev) => [...prev, createdRoom]);
      setNewRoomName("");

    } catch (err) {
      console.error("Error creating room:", err);
    }
  };


  return (
    <div className="chat-list-page">
        
      <h2>Welcome, user {userId}</h2>

      <h3
      className="see-all-rooms"
      onClick={() => navigate('/all-rooms')}
      >
      See All Public Rooms
      </h3>

      <div className="room-list">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="room-card"
            onClick={() => navigate(`/room/${room.id}`)}
          >
            
            <h3>{room.name}</h3>
          </div>
        ))}
      </div>

      <div className="create-room">
        <input
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
          placeholder="New room name"
        />
        <button onClick={handleCreateRoom}>Create Room</button>
      </div>
    </div>
  );
};

export default ChatList;
