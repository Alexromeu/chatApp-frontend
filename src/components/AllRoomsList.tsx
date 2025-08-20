import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllRooms } from "../utils/api"
import type { ChatRoom } from "../types/types";
import { BackButton } from "./BackButton";
import RoomFilter from "./RoomFilter";

const AllChatRooms = () => {
  const navigate = useNavigate();
  const [ rooms, setRooms ] = useState<ChatRoom[]>([]);
  const [ isFiltred, setIsFiltered ] = useState(false)

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (!token) return;

    getAllRooms()
      .then((res) => {
        setRooms(res.data);
      });
  }, []);

  return (
    
    <div className="chat-list-page">
      <h2>Explore Public Rooms</h2>

      <RoomFilter setIsFiltered={setIsFiltered}/>
      
      {!isFiltred && <div className="room-list">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="room-card"
            onClick={() => navigate(`/room/${room.id}`)}
          >
            
            <h3>{room.name}</h3>
          </div>
        ))}
        
      </div>}
      <BackButton />
    </div>
  );
};

export default AllChatRooms;
