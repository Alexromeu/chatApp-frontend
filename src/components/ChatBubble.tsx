import React from "react";
import { seededBubbleColor } from "../utils/colors";
import "../styles/chat_bubble.css"


interface ChatBubbleProps {
  sendername: string;
  content: string;
  isOwnMessage?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ sendername, content, isOwnMessage }) => {
  return (
    <div
      className={`chat-bubble ${isOwnMessage ? "own" : "other"}`}
      style={{ backgroundColor: seededBubbleColor(sendername) }}
    >
      <strong>{sendername}: </strong>
      <span>{content}</span>
    </div>
  );
};

export default ChatBubble;
