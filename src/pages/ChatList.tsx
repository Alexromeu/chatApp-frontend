import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getChatRooms, createChatRoom } from "../utils/api";
import { jwtDecode } from "jwt-decode";
import type { TokenPayload } from "../types/types";
import type { ChatRoom } from "../types/types";
import NoRoomName from "../components/messages/NoRoomName";
import "../styles/chat_list_page.css"


const ChatList = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [newRoomName, setNewRoomName] = useState("");
  const [username, setUsername] = useState("");
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("authToken");
console.log("chatlist file ", userId)
    if (!token || !userId) return;
    getChatRooms(userId)
      .then((res) => {
        setRooms(res.data);
      });
    
    const decoded = jwtDecode<TokenPayload>(token!)
    setUsername(decoded.username)

  }, [userId]);

  const handleCreateRoom = async () => {
    const token = localStorage.getItem("authToken");
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


  return (
    <div className="chat-list-page">
        
      <h2  className="welcome-message">Welcome, user {username}</h2>

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

      <NoRoomName isOpen={isOpen} onTryAgain={() => {
        navigate(`/chatlist/${userId}`)
        setIsOpen(false)
        }}/>

    </div>
  );
};

export default ChatList;
