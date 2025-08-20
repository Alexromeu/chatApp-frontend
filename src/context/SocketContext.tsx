import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { socket } from "../sockets";
import type { TokenPayload } from "../types/types"
import { getRoomById } from "../utils/api"
import type { SocketContextType } from "../types/types"


const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider = ({
  children,
  roomId

}: {
  children: React.ReactNode;
  roomId: string;

}) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername ] = useState<string | null>(null)
  const [roomname, setRoomname ] = useState<string | null>(null)

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    
    getRoomById(roomId)
      .then((res) => {
        setRoomname(res.data.name)
      })

    if (token) {
      const decoded = jwtDecode<TokenPayload>(token);
      setUserId(decoded.userId);
      setUsername(decoded.username);
      

      socket.auth = { token };
      socket.connect();
      
    } 
    return () => {
      socket.disconnect();
    };

  }, []);

  return (
    <SocketContext.Provider value={{ socket, userId, username, roomId, roomname }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) throw new Error("useSocket must be used within a SocketProvider");
  return context;
};
