import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllRooms } from "../utils/api"
import type { ChatRoom } from "../types/types";
import { BackButton } from "./BackButton";
import RoomFilter from "./RoomFilter";
import HiveGrid from "./HiveGrid";
import { seededGradient } from "../utils/colors";

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
      
      {!isFiltred && (
        <HiveGrid
          items={rooms}
          getKey={(room) => room.id}
          renderItem={(room) => (
            <div
              className="room-card"
              style={{ backgroundImage: seededGradient(room.id) }}
              onClick={() => navigate(`/room/${room.id}`)}
            >
              <h3>{room.name}</h3>
            </div>
          )}
        />
      )}
      <BackButton />
    </div>
  );
};

export default AllChatRooms;
