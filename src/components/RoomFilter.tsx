import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFilteredRooms } from "../utils/api";
import type { ChatRoom } from "../types/types";
import "../styles/room_filter.css"

interface RoomFilterProps {
  setIsFiltered: (value: boolean) => void;
}

const RoomFilter = ({ setIsFiltered }: RoomFilterProps) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [filteredRooms, setFilteredRooms] = useState<ChatRoom[]>([]);
  

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await getFilteredRooms(query);
        setFilteredRooms(res.data);
        setIsFiltered(res.data.length > 0)
      } catch (err) {
        console.error("Error fetching filtered rooms:", err);
      }
    };
   
    if (query.trim() !== "") {
      fetchRooms();
    } else {
      setFilteredRooms([]);
      setIsFiltered(false);
    }
  }, [query]);

  return (
    <div className="room-filter">
      <input
        name="room-filter"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search chat rooms..."
      />

      <div className="filtered-room-list">
        {filteredRooms.map((room) => (
          <div key={room.id} className="room-card">
            <h3 onClick={() => navigate(`/room/${room.id}`)}>{room.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomFilter;
