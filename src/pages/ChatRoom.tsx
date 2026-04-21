import { useChatSocket } from "../hooks/useSockets";
import { useSocket } from "../context/SocketContext";
import { useRef, useState } from "react";
import ChatBubble from "../components/ChatBubble";
import TypingIndicator from "../components/TypingIndicator";
import { BackButton } from "../components/BackButton";
import UserList from "../components/UserList";
import "../styles/chat.css";

const ChatRoom = () => {
  const { roomId, userId, username, roomname } = useSocket();
  const {
    messages,
    sendMessage,
    emitTyping,
    emitStopTyping,
    onlineUsers,
  } = useChatSocket();

  const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
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

    sendMessage({
      content: text,
      roomId,
      senderId: userId!,
      timestamp: Date.now(),
      sendername: username!,
    });

    setText("");
    emitStopTyping();
  };

  return (
    <div className="chat-room">
      <div className="chat-toolbar">
        <BackButton />
        <h2 className="chat-room-title">{roomname}</h2>
      </div>

      <div className="chat-layout">
        <section className="chat-main">
          <div className="chat-messages">
            {messages.map((msg) => (
              <ChatBubble
                key={msg.id}
                sendername={msg.sendername}
                content={msg.content}
                isOwnMessage={msg.senderId === userId}
              />
            ))}
          </div>

          <TypingIndicator />

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
        </section>

        <UserList
          onlineUserIds={onlineUsers}
          messages={messages}
          selfUserId={userId}
        />
      </div>
    </div>
  );
};

export default ChatRoom;
