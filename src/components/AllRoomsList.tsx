import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllRooms } from "../utils/api"

type ChatRoom = {
  id: string;
  name: string;
};

const AllChatRooms = () => {
  const navigate = useNavigate();
  const [ rooms, setRooms ] = useState<ChatRoom[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    getAllRooms()
      .then((res) => {
        setRooms(res.data);
      });
  }, []);

  return (
    <div className="chat-list-page">
      <h2>Explore Public Rooms</h2>

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
    </div>
  );
};

export default AllChatRooms;
