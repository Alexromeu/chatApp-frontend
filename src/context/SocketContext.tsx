import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { socket } from "../sockets";

type TokenPayload = {
  userId: string;
};

type SocketContextType = {
  socket: typeof socket;
  userId: string | null;
  roomId: string;
};

const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider = ({
  children,
  roomId
}: {
  children: React.ReactNode;
  roomId: string;
}) => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decoded = jwtDecode<TokenPayload>(token);
      setUserId(decoded.userId);
      socket.auth = { token };
      socket.connect();
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, userId, roomId }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) throw new Error("useSocket must be used within a SocketProvider");
  return context;
};
