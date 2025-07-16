
import { useChatSocket } from "../hooks/useSockets";
import { useSocket } from "../context/SocketContext";

const TypingIndicator = () => {
  const { typingUsers } = useChatSocket();
  const { roomId } = useSocket();
  const usersTyping = typingUsers[roomId] || [];

  return usersTyping.length ? (
    <div className="typing-indicator text-gray-500 italic mt-2">
      {usersTyping.join(", ")} {usersTyping.length === 1 ? "is" : "are"} typing...
    </div>
  ) : null;
};



export default TypingIndicator;
