import { useChatSocket } from "../hooks/useSockets";
import { useSocket } from "../context/SocketContext";
import {  useRef, useState } from "react";
import OnlineUsers from "../components/OnlineUsers"
import TypingIndicator from "../components/TypingIndicator";
 
const ChatRoom = () => {
  const { roomId, userId } = useSocket();
  const {
    messages,
    sendMessage,
    emitTyping,
    emitStopTyping,
  } = useChatSocket();

  let typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    emitTyping();
    if (typingTimeout.current !== null) {
      clearTimeout(typingTimeout.current);
}
    typingTimeout.current = setTimeout(() => emitStopTyping(), 1000);
  };

  const handleSend = () => {
    if (text.trim() === "") return;
    sendMessage({ content: text, roomId, senderId: userId!, timestamp: Date.now() });
    setText("");
    emitStopTyping();
  };

  
  return (
    <div className="chat-room">
      <div className="chat-header">
        <h2>Room: {roomId}</h2>
        <OnlineUsers />
      </div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className="chat-bubble">
            <strong>{msg.senderId}: </strong>
            <span>{msg.content}</span>
          </div>
        ))}
      </div>

      <TypingIndicator  />

      <div className="chat-input">
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="Type a message"
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatRoom;
