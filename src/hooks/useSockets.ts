import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";
import { listenForChatMessages, sendMessage, } from "../sockets/chatSocket";
import { joinRoom, leaveRoom } from "../sockets/roomSocket";
import { emitUserOnline, emitTyping, emitStopTyping, listenForTyping, onOnlineUsersUpdate } from "../sockets/presenceSocket"
import { useMessages } from "../hooks/useMessages"

import type { MessagePayload } from "../types/types";


export const useChatSocket = () => {
  const { socket, userId, roomId } = useSocket();//info used for typing
  const { messages, setMessages } = useMessages(roomId, userId!);
  const [ onlineUsers, setOnlineUsers ] = useState<string[]>([]);
  const [ typingUsers, setTypingUsers ] = useState<Record<string, string[]>>({});

  useEffect(() => {
    if (!roomId || !userId) return;

    joinRoom(roomId, userId);
    emitUserOnline(userId);

    listenForChatMessages((msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    onOnlineUsersUpdate((incomingRoomId, users) => {

  if (incomingRoomId === roomId) {
    setOnlineUsers(users);
  }
});


    listenForTyping(
    (typingPayload) => {
     const { roomId, senderId } = typingPayload;
        setTypingUsers(prev => {
        const current = prev[roomId] || [];
        const updated = [...new Set([...current, senderId])];

        return { ...prev, [roomId]: updated };
        });
    },

    (typingPayload) => {
      const { roomId, senderId } = typingPayload;
        setTypingUsers(prev => {
        const updated = (prev[roomId] || []).filter(id => id !== senderId);
        
        return { ...prev, [roomId]: updated };
        });
    }
    );


    return () => {
      leaveRoom(roomId, userId);
      socket.off("chatMessage");
      socket.off("typing");
      socket.off("stopTyping");
      socket.off("userJoined");
      socket.off("userLeft");
      socket.off("onlineUsers");
    };
  }, [roomId, userId]);

  return {
    messages,
    sendMessage: (msg: MessagePayload) => sendMessage(msg),
    emitTyping: () => {
        if (roomId && userId) {
         emitTyping(roomId, userId);
         }
    },

    emitStopTyping: () => {
        if (roomId && userId) {
         emitStopTyping(roomId, userId);
         }
},

    onlineUsers,
    typingUsers,
  };
};
