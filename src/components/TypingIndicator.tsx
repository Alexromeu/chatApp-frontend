
import { useChatSocket } from "../hooks/useSockets";
import { useSocket } from "../context/SocketContext";
import { useEffect, useState } from "react";
import { fetchUsernames } from "../utils/fetchUsernames";

const TypingIndicator = () => {
  const { typingUsers } = useChatSocket();
  const { roomId } = useSocket();
  const usersTyping = typingUsers[roomId] || [];
  const [usernamesArray, setUsernamesArray] = useState<string[]>([]);

  useEffect(() => {
    const fetchAndSetUsernames = async () => {
      const usernames = await fetchUsernames(usersTyping);
      setUsernamesArray(usernames) 
    } 
    fetchAndSetUsernames()
  }, [typingUsers])

  return usersTyping.length ? (
    <div className="typing-indicator text-gray-500 italic mt-2">
      {usernamesArray.join(", ")} {usernamesArray.length === 1 ? "is" : "are"} typing...
    </div>
  ) : null;
};


export default TypingIndicator;
