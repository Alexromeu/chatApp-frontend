import React from "react";


interface ChatBubbleProps {
  sendername: string;
  content: string;
  isOwnMessage?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ sendername, content, isOwnMessage }) => {
  return (
    <div className={`chat-bubble ${isOwnMessage ? "own-message" : ""}`}>
      <strong>{sendername}: </strong>
      <span>{content}</span>
    </div>
  );
};

export default ChatBubble;
