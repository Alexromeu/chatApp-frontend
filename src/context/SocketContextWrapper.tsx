import { useParams } from "react-router-dom";
import { SocketProvider } from "../context/SocketContext";

const SocketContextWrapper = ({ children }: { children: React.ReactNode }) => {
  const { roomId } = useParams();
  const resolvedRoomId = roomId || "default-room";

  return (
    <SocketProvider roomId={resolvedRoomId}>
      {children}
    </SocketProvider>
  );
};

export default SocketContextWrapper;
